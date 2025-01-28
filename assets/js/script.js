/**
 * Table of Contents Generator
 * 
 * This script generates a dynamic table of contents from h2 headings in an article.
 * It provides smooth scrolling, active state tracking, and URL hash updates.
 * 
 * Features:
 * - Automatically generates TOC links from h2 headings
 * - Smooth scrolling to sections when clicking TOC links
 * - Tracks active section during scrolling
 * - Updates URL hash without page reload
 * - Handles duplicate heading text
 * - Supports multiple TOC instances on one page
 * - Configurable via data attributes
 */
$(document).ready(function () {
    // Initialize each TOC wrapper
    $('[data-toc-element="wrapper"]').each(function(wrapperIndex, eachWrapper) {
        // Get DOM elements and configuration
        const currentWrapper = $(this);
        const currentList = currentWrapper.find('[data-toc-element="list"]');
        const currentArticle = currentWrapper.find('[data-toc-element="article"]');
        const currentLinkClass = currentList.attr('data-toc-link-class') || 'toc-link';
        const currentActiveClass = currentList.attr('data-toc-active-class') || 'active';
        const currentScrollTopOffset = +currentList.attr('data-toc-scrollTopOffset') || 0;
        const currentScrollDuration = +currentList.attr('data-toc-scrollDuration') || 400;

        /**
         * Debounce function to prevent rapid-fire execution
         * @param {Function} func - Function to debounce
         * @param {number} wait - Delay in milliseconds
         * @returns {Function} Debounced function
         */
        const debounce = (func, wait) => {
            let timeout;
            return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            };
        };

        /**
         * Throttle function to limit execution rate
         * @param {Function} func - Function to throttle
         * @param {number} limit - Minimum time between executions in milliseconds
         * @returns {Function} Throttled function
         */
        const throttle = (func, limit) => {
            let inThrottle;
            return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
            };
        };

        /**
         * Updates active state of TOC links
         * @param {string} currentEntryId - ID of current active section
         */
        const updateActiveClass = throttle((currentEntryId) => {
            const activeLink = $(currentList).find(`.${currentActiveClass}`);
            const newActiveLink = $(currentList).find(`a[href="#${currentEntryId}"]`);
            
            if (!newActiveLink.hasClass(currentActiveClass)) {
            activeLink.removeClass(currentActiveClass);
            newActiveLink.addClass(currentActiveClass);
            history.replaceState(null, null, '#' + currentEntryId);
            }
        }, 100); // Throttle to max once per 100ms

        // Create observer for the article element to handle when it leaves viewport
        const articleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
            if (!entry.isIntersecting) {
                // Remove active class from all links when article is out of view
                $(currentList).find(`.${currentActiveClass}`).removeClass(currentActiveClass);
            }
            });
        }, {
            threshold: 0
        });

        // Observe the article element
        articleObserver.observe(currentArticle[0]);

        /**
         * Observer for individual TOC sections
         * Handles active state updates during scrolling
         */
        const currentTableOfContentsObserver = new IntersectionObserver(debounce((entries) => {
            entries.forEach(entry => {
            const currentEntryId = entry.target.getAttribute("id");
            const headings = currentArticle.find("h2").toArray();
            const lastHeading = headings[headings.length - 1];
            
            if (entry.isIntersecting) {
                updateActiveClass(currentEntryId);
            } else if (!entry.isIntersecting && entry.target === lastHeading) {
                const rect = entry.target.getBoundingClientRect();
                if (rect.top < window.innerHeight) {
                updateActiveClass(currentEntryId);
                }
            }
            });
        }, 50), { 
            rootMargin: '0px 0px -25% 0px',
            threshold: [0, 0.25, 0.5, 0.75, 1]
        });
        
        // Track duplicate headings to create unique IDs
        const headingCounts = {};
        
        // Process each h2 heading in the article
        currentArticle.find("h2").each(function(headingIndex, eachHeading) {
            const currentHeadingText = $(eachHeading).text();
            let convertedHeadingId = currentHeadingText.replace(/\s+/g, '-').replace(/[°&\/\\#,+()$~%.'":;*?<>{}]/g, "").toLowerCase();
            
            // Handle duplicate heading text by adding number suffix
            if (headingCounts[currentHeadingText]) {
            headingCounts[currentHeadingText]++;
            convertedHeadingId += `-${headingCounts[currentHeadingText]}`;
            } else {
            headingCounts[currentHeadingText] = 1;
            }
            
            // Set heading ID and observe for intersection
            $(eachHeading).attr("id", convertedHeadingId);
            currentTableOfContentsObserver.observe(eachHeading);
            
            // Create and append TOC link
            const createdTableOfContentsItem = $("<a>")
            .text(currentHeadingText)
            .attr("class", currentLinkClass)
            .attr("href", "#" + convertedHeadingId)
            .on('click', function(e) {
                e.preventDefault();
                const targetElement = $($(this).attr('href'));
                const offset = currentScrollTopOffset;
                const targetPosition = targetElement.offset().top - offset;

                updateActiveClass(convertedHeadingId);
                
                $('html, body').animate({
                scrollTop: targetPosition
                }, currentScrollDuration);
            });
            
            currentList.append(createdTableOfContentsItem);
        });

        // Handle initial page load with hash in URL
        if(window.location.hash) {
            const targetElement = $(window.location.hash);
            if(targetElement.length) {
            setTimeout(function() {
                const offset = currentScrollTopOffset;
                const targetPosition = targetElement.offset().top - offset;
                
                updateActiveClass(window.location.hash.substring(1));
                
                $('html, body').animate({
                scrollTop: targetPosition
                }, currentScrollDuration);
            }, 300);
            }
        }
    });
});