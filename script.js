/**
 * Insights Wireframe Template - JavaScript
 * ========================================
 * Handles interactivity for the dashboard template including:
 * - Tab navigation
 * - Slicer interactions
 * - Icon initialization
 * - Dynamic content updates
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize icons
    initializeIcons();
    
    // Initialize tab navigation
    initializeTabNavigation();
    
    // Initialize interactive elements
    initializeSlicers();
    
    // Initialize toolbar buttons
    initializeToolbarButtons();
    
    // Set initial state
    setInitialState();
});

/**
 * Initialize Lucide icons
 */
function initializeIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    } else {
        console.warn('Lucide icons not loaded. Please ensure the Lucide script is included.');
    }
}

/**
 * Initialize tab navigation functionality
 */
function initializeTabNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const pageContents = document.querySelectorAll('.page-content');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-tab');
            
            // Remove active class from all tabs
            navTabs.forEach(t => t.classList.remove('active'));
            
            // Remove active class from all pages
            pageContents.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding page
            const targetPageElement = document.querySelector(`[data-page="${targetPage}"]`);
            if (targetPageElement) {
                targetPageElement.classList.add('active');
            }
            
            // Optional: Track analytics or update URL
            // updateURL(targetPage);
            // trackTabView(targetPage);
        });
    });
}

/**
 * Initialize slicer pill interactions
 */
function initializeSlicers() {
    // Bookmark slicers (single selection)
    const bookmarkSlicers = document.querySelectorAll('.rail-section:nth-child(2) .slicer-pill');
    bookmarkSlicers.forEach(slicer => {
        slicer.addEventListener('click', function() {
            // Remove active class from all bookmark slicers
            bookmarkSlicers.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked slicer
            this.classList.add('active');
            
            // Optional: Trigger data refresh
            // refreshData('bookmark', this.textContent);
        });
    });
    
    // Region slicers (multi-selection)
    const regionSlicers = document.querySelectorAll('.rail-section:nth-child(3) .slicer-pills .slicer-pill');
    regionSlicers.forEach(slicer => {
        slicer.addEventListener('click', function() {
            // Toggle active class
            this.classList.toggle('active');
            
            // Get all selected regions
            const selectedRegions = Array.from(regionSlicers)
                .filter(s => s.classList.contains('active'))
                .map(s => s.textContent);
            
            // Optional: Trigger data refresh
            // refreshData('regions', selectedRegions);
        });
    });
}

/**
 * Initialize toolbar button interactions
 */
function initializeToolbarButtons() {
    const refreshButton = document.querySelector('.toolbar-btn');
    
    if (refreshButton) {
        refreshButton.addEventListener('click', function() {
            // Add loading state
            this.style.opacity = '0.6';
            this.style.pointerEvents = 'none';
            
            // Simulate refresh operation
            setTimeout(() => {
                this.style.opacity = '1';
                this.style.pointerEvents = 'auto';
                
                // Optional: Show success message or update timestamp
                showRefreshSuccess();
            }, 2000);
        });
    }
}

/**
 * Set initial state of the application
 */
function setInitialState() {
    // Set default active tab (Analyze)
    const defaultTab = document.querySelector('.nav-tab[data-tab="Analyze"]');
    const defaultPage = document.querySelector('.page-content[data-page="Analyze"]');
    
    if (defaultTab && defaultPage) {
        // Remove active from Monitor (which might be set by default)
        document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
        
        // Set Analyze as active
        defaultTab.classList.add('active');
        defaultPage.classList.add('active');
    }
    
    // Ensure Week bookmark is selected by default
    const weekBookmark = document.querySelector('.slicer-pill');
    if (weekBookmark && weekBookmark.textContent.trim() === 'Week') {
        weekBookmark.classList.add('active');
    }
}

/**
 * Show refresh success message
 */
function showRefreshSuccess() {
    // Create temporary success indicator
    const banner = document.querySelector('.banner-text');
    if (banner) {
        const originalText = banner.textContent;
        banner.textContent = `✓ Refreshed at ${new Date().toLocaleTimeString()} - Data is up to date.`;
        banner.style.color = '#065f46';
        
        // Reset after 3 seconds
        setTimeout(() => {
            banner.textContent = originalText;
        }, 3000);
    }
}

/**
 * Utility function to generate random KPI values
 * (Useful for demo purposes or when connecting to real data)
 */
function generateRandomKPIValue(min = 70, max = 100) {
    return Math.round(min + Math.random() * (max - min));
}

/**
 * Update KPI values dynamically
 * (Can be called when data refreshes)
 */
function updateKPIValues() {
    const kpiCards = document.querySelectorAll('.kpi-card');
    
    kpiCards.forEach(card => {
        const valueElement = card.querySelector('.kpi-value');
        if (valueElement && valueElement.textContent.includes('%')) {
            const newValue = generateRandomKPIValue();
            valueElement.textContent = `${newValue}%`;
        }
    });
}

/**
 * Handle responsive behavior
 */
function handleResponsive() {
    const leftRail = document.querySelector('.left-rail');
    const canvas = document.querySelector('.canvas');
    
    function checkScreenSize() {
        if (window.innerWidth < 1024) {
            // Mobile/tablet behavior
            leftRail?.classList.add('hidden-mobile');
        } else {
            // Desktop behavior
            leftRail?.classList.remove('hidden-mobile');
        }
    }
    
    // Check on load and resize
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
}

/**
 * Optional: URL management for bookmarking tabs
 */
function updateURL(tabName) {
    if (history.pushState) {
        const newURL = new URL(window.location);
        newURL.searchParams.set('tab', tabName.toLowerCase().replace(' ', '-'));
        history.pushState({ tab: tabName }, '', newURL);
    }
}

/**
 * Optional: Load tab from URL parameter
 */
function loadTabFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    
    if (tabParam) {
        const targetTab = tabParam.replace('-', ' ');
        const tabButton = document.querySelector(`[data-tab="${targetTab}"]`);
        if (tabButton) {
            tabButton.click();
        }
    }
}

/**
 * Optional: Analytics tracking
 */
function trackTabView(tabName) {
    // Example: Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_title: `Dashboard - ${tabName}`,
            page_location: window.location.href
        });
    }
    
    // Example: Custom analytics
    console.log(`Tab viewed: ${tabName} at ${new Date().toISOString()}`);
}

/**
 * Optional: Data refresh functionality
 */
function refreshData(filterType, filterValue) {
    console.log(`Data refresh requested - ${filterType}:`, filterValue);
    
    // Here you would typically make API calls to update charts and KPIs
    // Example:
    // fetch('/api/dashboard/data', {
    //     method: 'POST',
    //     body: JSON.stringify({ [filterType]: filterValue }),
    //     headers: { 'Content-Type': 'application/json' }
    // })
    // .then(response => response.json())
    // .then(data => updateDashboardData(data));
}

/**
 * Optional: Keyboard navigation support
 */
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Tab navigation with arrow keys
        if (e.target.classList.contains('nav-tab')) {
            const tabs = Array.from(document.querySelectorAll('.nav-tab'));
            const currentIndex = tabs.indexOf(e.target);
            
            let nextIndex;
            if (e.key === 'ArrowLeft') {
                nextIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
                e.preventDefault();
            } else if (e.key === 'ArrowRight') {
                nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
                e.preventDefault();
            }
            
            if (nextIndex !== undefined) {
                tabs[nextIndex].focus();
            }
        }
        
        // Enter/Space to activate focused elements
        if (e.key === 'Enter' || e.key === ' ') {
            if (e.target.classList.contains('nav-tab') || 
                e.target.classList.contains('slicer-pill') ||
                e.target.classList.contains('toolbar-btn')) {
                e.target.click();
                e.preventDefault();
            }
        }
    });
}

// Initialize keyboard navigation
document.addEventListener('DOMContentLoaded', function() {
    initializeKeyboardNavigation();
    handleResponsive();
    
    // Load initial state from URL if present
    loadTabFromURL();
});

/**
 * ========================================
 * REBATE DASHBOARD SPECIFIC FUNCTIONALITY
 * ========================================
 */

// Rebate Configuration
const REBATE_CONFIG = {
    tiers: [
        {
            name: "Tier 1",
            target: 3350000,
            rates: {
                Brady: 0.06,
                "CRT-P": 0.04,
                Tachy: 0.05,
                "Micra VR": 0.05,
                "Micra AV": 0.03,
            },
        },
        {
            name: "Tier 2", 
            target: 3850000,
            rates: {
                Brady: 0.09,
                "CRT-P": 0.07,
                Tachy: 0.05,
                "Micra VR": 0.05,
                "Micra AV": 0.03,
            },
        },
        {
            name: "Tier 3",
            target: 4350000,
            rates: {
                Brady: 0.16,
                "CRT-P": 0.12,
                Tachy: 0.05,
                "Micra VR": 0.05,
                "Micra AV": 0.03,
            },
        },
    ],
    currentData: {
        currentActual: 1412730,
        runRate: 2295686,
        customer: "Banner Health",
        period: "CY25 Q2 (Apr 1–Jun 30, 2025)"
    },
    productMix: {
        Brady: 0.3,
        "CRT-P": 0.25,
        Tachy: 0.25,
        "Micra VR": 0.15,
        "Micra AV": 0.05,
    }
};

/**
 * Initialize rebate dashboard functionality
 */
function initializeRebateDashboard() {
    initializeUpliftSlider();
    initializeProductMixEditor();
    updateRebateCalculations();
}

/**
 * Initialize the what-if uplift slider
 */
function initializeUpliftSlider() {
    const slider = document.getElementById('upliftSlider');
    const sliderValue = document.querySelector('.slider-value');
    
    if (slider && sliderValue) {
        slider.addEventListener('input', function() {
            const value = parseInt(this.value);
            sliderValue.textContent = `${value}%`;
            updateRebateCalculations();
        });
    }
}

/**
 * Initialize product mix editor sliders
 */
function initializeProductMixEditor() {
    const mixSliders = document.querySelectorAll('.product-mix-editor input[type="range"]');
    
    mixSliders.forEach(slider => {
        slider.addEventListener('input', function() {
            const product = this.getAttribute('data-product');
            const value = parseInt(this.value);
            const span = this.nextElementSibling;
            
            if (span) {
                span.textContent = `${value}%`;
            }
            
            // Update product mix configuration
            REBATE_CONFIG.productMix[product] = value / 100;
            
            // Update left rail display
            updateProductMixDisplay();
            
            // Recalculate rebates
            updateRebateCalculations();
        });
    });
}

/**
 * Update product mix display in left rail
 */
function updateProductMixDisplay() {
    const mixItems = document.querySelectorAll('.product-mix .mix-item');
    
    mixItems.forEach(item => {
        const text = item.querySelector('span').textContent;
        const product = text.split(':')[0].trim();
        const valueSpan = item.querySelector('.mix-value');
        
        if (REBATE_CONFIG.productMix[product] !== undefined) {
            valueSpan.textContent = `${Math.round(REBATE_CONFIG.productMix[product] * 100)}%`;
        }
    });
}

/**
 * Calculate which tier is achieved for a given amount
 */
function getAchievedTier(amount) {
    const tiers = REBATE_CONFIG.tiers;
    if (amount >= tiers[2].target) return tiers[2];
    if (amount >= tiers[1].target) return tiers[1];
    if (amount >= tiers[0].target) return tiers[0];
    return null;
}

/**
 * Calculate blended rebate rate based on product mix
 */
function calculateBlendedRate(tier, productMix) {
    if (!tier) return 0;
    
    let weightedRate = 0;
    let totalWeight = 0;
    
    Object.keys(productMix).forEach(product => {
        const weight = productMix[product] || 0;
        const rate = tier.rates[product] || 0;
        weightedRate += weight * rate;
        totalWeight += weight;
    });
    
    return totalWeight > 0 ? weightedRate / totalWeight : 0;
}

/**
 * Project rebate for a given amount and product mix
 */
function projectRebate(amount, productMix) {
    const tier = getAchievedTier(amount);
    const rate = calculateBlendedRate(tier, productMix);
    return {
        tier,
        rate,
        value: amount * rate
    };
}

/**
 * Update all rebate calculations and displays
 */
function updateRebateCalculations() {
    const slider = document.getElementById('upliftSlider');
    const upliftPct = slider ? parseInt(slider.value) : 0;
    
    const current = REBATE_CONFIG.currentData.currentActual;
    const runRate = REBATE_CONFIG.currentData.runRate;
    const forecastAmount = Math.round(runRate * (1 + upliftPct / 100));
    
    const currentProj = projectRebate(current, REBATE_CONFIG.productMix);
    const runRateProj = projectRebate(runRate, REBATE_CONFIG.productMix);
    const forecastProj = projectRebate(forecastAmount, REBATE_CONFIG.productMix);
    
    // Update KPI cards
    updateKPICard('PROJECTED REBATE', `$${formatCurrency(Math.round(runRateProj.value))}`, 
                  `${runRateProj.tier ? runRateProj.tier.name : 'None'} • Blended ${(runRateProj.rate * 100).toFixed(1)}%`);
    
    updateKPICard('STATUS', getStatusBadge(current));
    
    // Update what-if results
    updateWhatIfResults(forecastAmount, forecastProj);
    
    // Update tier progress
    updateTierProgress(current, runRate);
    
    // Update tier details
    updateTierDetails(current);
}

/**
 * Update a KPI card with new values
 */
function updateKPICard(title, value, subtitle) {
    const cards = document.querySelectorAll('.kpi-card');
    cards.forEach(card => {
        const cardTitle = card.querySelector('.kpi-title');
        if (cardTitle && cardTitle.textContent.includes(title)) {
            const valueElement = card.querySelector('.kpi-value');
            const subtitleElement = card.querySelector('.kpi-subtitle');
            
            if (typeof value === 'string') {
                if (valueElement) valueElement.innerHTML = value;
            } else {
                if (valueElement) valueElement.textContent = value;
            }
            if (subtitle && subtitleElement) subtitleElement.textContent = subtitle;
        }
    });
}

/**
 * Get status badge HTML
 */
function getStatusBadge(current) {
    const tiers = REBATE_CONFIG.tiers;
    if (current < tiers[0].target) {
        return '<div class="kpi-badge red">Trending to miss Tier 1</div>';
    } else if (current < tiers[1].target) {
        return '<div class="kpi-badge amber">Between Tier 1 and Tier 2</div>';
    } else if (current < tiers[2].target) {
        return '<div class="kpi-badge amber">Between Tier 2 and Tier 3</div>';
    } else {
        return '<div class="kpi-badge green">Tier 3 Achieved</div>';
    }
}

/**
 * Update what-if results display
 */
function updateWhatIfResults(forecastAmount, forecastProj) {
    const forecastAmountElement = document.getElementById('forecastAmount');
    const projectedRebateElement = document.getElementById('projectedRebate');
    const tierOutcomeElement = document.getElementById('tierOutcome');
    
    if (forecastAmountElement) {
        forecastAmountElement.textContent = `$${formatCurrency(forecastAmount)}`;
    }
    
    if (projectedRebateElement) {
        projectedRebateElement.textContent = `$${formatCurrency(Math.round(forecastProj.value))}`;
    }
    
    if (tierOutcomeElement) {
        tierOutcomeElement.textContent = forecastProj.tier ? forecastProj.tier.name : 'None';
    }
}

/**
 * Update tier progress visualization
 */
function updateTierProgress(current, runRate) {
    const maxAmount = REBATE_CONFIG.tiers[2].target * 1.15;
    const currentPct = (current / maxAmount) * 100;
    const runRatePct = (runRate / maxAmount) * 100;
    
    const currentFill = document.querySelector('.progress-fill.current');
    const runRateFill = document.querySelector('.progress-fill.runrate');
    
    if (currentFill) currentFill.style.width = `${Math.max(currentPct, 5)}%`;
    if (runRateFill) runRateFill.style.width = `${Math.max(runRatePct, 5)}%`;
    
    // Update legend
    const currentLegend = document.querySelector('.legend-item span');
    const runRateLegend = document.querySelectorAll('.legend-item span')[1];
    
    if (currentLegend) currentLegend.textContent = `Current: $${formatCurrency(current)}`;
    if (runRateLegend) runRateLegend.textContent = `Run Rate: $${formatCurrency(runRate)}`;
}

/**
 * Update tier details page
 */
function updateTierDetails(current) {
    const tierCards = document.querySelectorAll('.tier-card');
    
    tierCards.forEach((card, index) => {
        const tier = REBATE_CONFIG.tiers[index];
        if (!tier) return;
        
        const gap = Math.max(0, tier.target - current);
        const gapElement = card.querySelector('.tier-gap');
        const statusElement = card.querySelector('.tier-status');
        
        if (gapElement) {
            gapElement.textContent = gap > 0 ? `Gap: $${formatCurrency(gap)}` : 'Achieved!';
        }
        
        if (statusElement) {
            if (current >= tier.target) {
                statusElement.textContent = 'Achieved';
                statusElement.className = 'tier-status achieved';
            } else {
                statusElement.textContent = 'Not Achieved';
                statusElement.className = 'tier-status not-achieved';
            }
        }
    });
}

/**
 * Format number as currency (without cents for large numbers)
 */
function formatCurrency(amount) {
    if (amount >= 1000000) {
        return (amount / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (amount >= 1000) {
        return (amount / 1000).toFixed(0) + 'K';
    }
    return amount.toLocaleString();
}

/**
 * Set initial state for rebate dashboard
 */
function setRebateInitialState() {
    // Set default active tab (Dashboard)
    const defaultTab = document.querySelector('.nav-tab[data-tab="Dashboard"]');
    const defaultPage = document.querySelector('.page-content[data-page="Dashboard"]');
    
    if (defaultTab && defaultPage) {
        // Remove active from all tabs/pages
        document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
        
        // Set Dashboard as active
        defaultTab.classList.add('active');
        defaultPage.classList.add('active');
    }
}

/**
 * Initialize operational dashboard functionality
 */
function initializeOperationalDashboard() {
    initializeEnterpriseAccountSelector();
    initializePeriodControls();
    initializeExportButtons();
    initializeRunRateSlider();
    initializeGranularityControls();
    initializeHistoryInteractions();
    initializeForecastCalculator();
    initializeProductMixEditor();
    initializeViewOpportunitiesButton();
}

/**
 * Initialize enterprise account selector dropdown
 */
function initializeEnterpriseAccountSelector() {
    const dropdown = document.getElementById('enterpriseAccountSelector');
    
    if (dropdown) {
        dropdown.addEventListener('change', function() {
            const selectedAccount = this.value;
            
            // Update enterprise account data
            updateEnterpriseAccountData(selectedAccount);
            
            // Update tier alerts and opportunities
            updateTierAlerts(selectedAccount);
            
            // Update KPI values for new account
            updateKPIValuesForAccount(selectedAccount);
            
            // Update Action Required banner for new account
            updateActionRequiredBanner(selectedAccount);
            
            // Update Customer Summary for new account
            updateCustomerSummary(selectedAccount);
            
            // Update Tier Tracking data for new account
            updateTierTrackingData(selectedAccount);
            
            // Refresh all calculations for new account
            updateRebateCalculations();
            
            // Update banner
            updateBannerForCustomer(selectedAccount);
        });
    }
}

/**
 * Initialize period controls
 */
function initializePeriodControls() {
    const periodDropdown = document.querySelector('.period-dropdown');
    
    if (periodDropdown) {
        periodDropdown.addEventListener('change', function() {
            const selectedPeriod = this.value;
            
            // Update calculations based on period
            updateForPeriod(selectedPeriod);
        });
    }
}

/**
 * Initialize export buttons
 */
function initializeExportButtons() {
    // Export customer report button
    const exportBtn = document.querySelector('.export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            simulateExport('Customer Report');
        });
    }

    // Chart export buttons
    const chartBtns = document.querySelectorAll('.chart-btn');
    chartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const btnText = this.textContent.trim();
            
            if (btnText.includes('Export PDF')) {
                simulateExport('PDF Report');
            } else if (btnText.includes('Email')) {
                simulateEmail();
            } else if (btnText.includes('Presentation')) {
                enterPresentationMode();
            } else if (btnText.includes('Share')) {
                shareWithCustomer();
            }
        });
    });
}

/**
 * Initialize run rate slider
 */
function initializeRunRateSlider() {
    const runRateSlider = document.getElementById('runRateSlider');
    const sliderValue = document.querySelector('#runRateSlider + .slider-value');
    
    if (runRateSlider && sliderValue) {
        runRateSlider.addEventListener('input', function() {
            const value = parseInt(this.value);
            sliderValue.textContent = `${value}%`;
            updateRebateCalculations();
        });
    }
}

/**
 * Update customer stats based on selection
 */
function updateCustomerStats(customerId) {
    // Mock customer data
    const customerData = {
        banner: {
            facilities: 325,
            period: 'Apr 2024 - Apr 2026',
            type: 'Tiered Annual'
        },
        mayo: {
            facilities: 180,
            period: 'Jan 2024 - Jan 2027',
            type: 'Tiered Quarterly'
        },
        cleveland: {
            facilities: 95,
            period: 'Jul 2024 - Jul 2026',
            type: 'Tiered Semi-Annual'
        }
        // Add more customers as needed
    };
    
    const data = customerData[customerId] || customerData.banner;
    
    // Update stats display
    const facilityValue = document.querySelector('.stat-item .stat-value');
    if (facilityValue) facilityValue.textContent = data.facilities;
    
    const periodValues = document.querySelectorAll('.stat-item .stat-value');
    if (periodValues[1]) periodValues[1].textContent = data.period;
    if (periodValues[2]) periodValues[2].textContent = data.type;
}

/**
 * Update banner for selected customer
 */
function updateBannerForCustomer(customerId) {
    const banner = document.querySelector('.banner-text');
    if (banner) {
        const customerNames = {
            banner: 'Banner Health',
            mayo: 'Mayo Clinic',
            cleveland: 'Cleveland Clinic',
            kaiser: 'Kaiser Permanente',
            intermountain: 'Intermountain Healthcare'
        };
        
        const customerName = customerNames[customerId] || 'Banner Health';
        banner.textContent = `✓ Last Updated: Today 6:00 AM CST (Daily Auto-Refresh) • ${customerName} Enterprise Agreement • Real-time tracking active`;
    }
}

/**
 * Update calculations for different periods
 */
function updateForPeriod(period) {
    // This would integrate with actual period-based calculations
    console.log(`Updating calculations for ${period} period`);
    
    // Update relevant KPIs and projections based on period
    updateRebateCalculations();
}

/**
 * Simulate export functionality
 */
function simulateExport(type) {
    // Add loading state
    const exportBtns = document.querySelectorAll('.export-btn, .chart-btn');
    exportBtns.forEach(btn => {
        if (btn.textContent.includes('Export') || btn.textContent.includes('PDF')) {
            btn.style.opacity = '0.6';
            btn.style.pointerEvents = 'none';
            btn.innerHTML = `<i data-lucide="loader"></i> Generating...`;
        }
    });
    
    // Simulate export process
    setTimeout(() => {
        exportBtns.forEach(btn => {
            btn.style.opacity = '1';
            btn.style.pointerEvents = 'auto';
            if (btn.textContent.includes('Generating')) {
                btn.innerHTML = `<i data-lucide="download"></i> Export PDF Report`;
            }
        });
        
        // Show success message
        showExportSuccess(type);
    }, 2000);
}

/**
 * Simulate email functionality
 */
function simulateEmail() {
    // Mock email dialog
    const result = confirm('Send rebate summary to customer contact?\n\nTo: supply.chain@bannerhealth.com\nSubject: Q2 2025 Rebate Status Update - Banner Health');
    
    if (result) {
        // Show sending state
        showEmailSuccess();
    }
}

/**
 * Enter presentation mode
 */
function enterPresentationMode() {
    // Hide navigation and controls for presentation
    const nav = document.querySelector('.top-nav');
    const rail = document.querySelector('.left-rail');
    const footer = document.querySelector('.footer');
    
    if (nav) nav.style.display = 'none';
    if (rail) rail.style.display = 'none';
    if (footer) footer.style.display = 'none';
    
    // Add exit button
    const exitBtn = document.createElement('button');
    exitBtn.textContent = '× Exit Presentation Mode';
    exitBtn.className = 'presentation-exit';
    exitBtn.style.cssText = `
        position: fixed;
        top: 1rem;
        right: 1rem;
        z-index: 1000;
        background: var(--kpi-red);
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 0.375rem;
        cursor: pointer;
        font-size: var(--text-sm);
    `;
    
    exitBtn.addEventListener('click', function() {
        if (nav) nav.style.display = '';
        if (rail) rail.style.display = '';
        if (footer) footer.style.display = '';
        exitBtn.remove();
    });
    
    document.body.appendChild(exitBtn);
}

/**
 * Share with customer functionality
 */
function shareWithCustomer() {
    const shareOptions = [
        'Generate Customer-Facing PDF',
        'Create PowerPoint Summary',
        'Send Secure Link',
        'Schedule Review Meeting'
    ];
    
    const choice = prompt(`Share options:\n\n${shareOptions.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}\n\nEnter choice (1-4):`);
    
    if (choice && choice >= 1 && choice <= 4) {
        showShareSuccess(shareOptions[choice - 1]);
    }
}

/**
 * Show export success message
 */
function showExportSuccess(type) {
    const banner = document.querySelector('.banner-text');
    if (banner) {
        const originalText = banner.textContent;
        banner.textContent = `✓ ${type} generated successfully and saved to Downloads folder`;
        banner.style.color = '#065f46';
        
        setTimeout(() => {
            banner.textContent = originalText;
            banner.style.color = '';
        }, 4000);
    }
}

/**
 * Show email success message
 */
function showEmailSuccess() {
    const banner = document.querySelector('.banner-text');
    if (banner) {
        const originalText = banner.textContent;
        banner.textContent = `✓ Rebate summary sent successfully to supply.chain@bannerhealth.com`;
        banner.style.color = '#065f46';
        
        setTimeout(() => {
            banner.textContent = originalText;
            banner.style.color = '';
        }, 4000);
    }
}

/**
 * Show share success message
 */
function showShareSuccess(method) {
    const banner = document.querySelector('.banner-text');
    if (banner) {
        const originalText = banner.textContent;
        banner.textContent = `✓ ${method} initiated - Customer will receive within 15 minutes`;
        banner.style.color = '#065f46';
        
        setTimeout(() => {
            banner.textContent = originalText;
            banner.style.color = '';
        }, 4000);
    }
}

/**
 * Update Purchase Trend Chart based on granularity
 */
function updatePurchaseTrendChart(granularity) {
    // Different data sets for different granularities
    const trendData = {
        quarterly: {
            periods: [
                { label: 'Q1-23', value: '$1.8M', height: '35%', tier: '' },
                { label: 'Q2-23', value: '$2.1M', height: '40%', tier: '' },
                { label: 'Q3-23', value: '$2.7M', height: '50%', tier: '' },
                { label: 'Q4-23', value: '$4.6M', height: '85%', tier: 'Tier 3' },
                { label: 'Q1-24', value: '$4.2M', height: '78%', tier: 'Tier 3' },
                { label: 'Q2-24', value: '$3.7M', height: '68%', tier: 'Tier 1' },
                { label: 'Q3-24', value: '$3.0M', height: '55%', tier: 'None' },
                { label: 'Q2-25', value: '$1.4M', height: '28%', tier: 'Current' }
            ]
        },
        monthly: {
            periods: [
                { label: 'Jan', value: '$480K', height: '48%', tier: '' },
                { label: 'Feb', value: '$520K', height: '52%', tier: '' },
                { label: 'Mar', value: '$413K', height: '41%', tier: '' },
                { label: 'Apr', value: '$390K', height: '39%', tier: '' },
                { label: 'May', value: '$478K', height: '48%', tier: '' },
                { label: 'Jun', value: '$545K', height: '55%', tier: '' },
                { label: 'Jul', value: '$502K', height: '50%', tier: '' },
                { label: 'Aug', value: '$413K', height: '41%', tier: 'Current' }
            ]
        },
        weekly: {
            periods: [
                { label: 'W1', value: '$120K', height: '40%', tier: '' },
                { label: 'W2', value: '$135K', height: '45%', tier: '' },
                { label: 'W3', value: '$98K', height: '33%', tier: '' },
                { label: 'W4', value: '$110K', height: '37%', tier: '' },
                { label: 'W5', value: '$125K', height: '42%', tier: '' },
                { label: 'W6', value: '$140K', height: '47%', tier: '' },
                { label: 'W7', value: '$115K', height: '38%', tier: '' },
                { label: 'W8', value: '$103K', height: '34%', tier: 'Current' }
            ]
        }
    };
    
    const selectedData = trendData[granularity] || trendData.quarterly;
    const chartContainer = document.getElementById('purchaseTrendChart');
    
    if (chartContainer) {
        // Build the bar chart HTML
        let barsHTML = '<div class="trend-bars">';
        
        selectedData.periods.forEach((period, index) => {
            const isLast = index === selectedData.periods.length - 1;
            const periodClass = isLast ? 'trend-period current' : 'trend-period';
            
            barsHTML += `
                <div class="${periodClass}">
                    <div class="trend-bar" style="height: ${period.height}"></div>
                    <div class="trend-label">${period.label}</div>
                    <div class="trend-value">${period.value}</div>
                    ${period.tier ? `<div class="tier-achieved">${period.tier}</div>` : ''}
                </div>
            `;
        });
        
        barsHTML += '</div>';
        chartContainer.innerHTML = barsHTML;
    }
}

/**
 * Initialize View Opportunities button
 */
function initializeViewOpportunitiesButton() {
    const viewOpportunitiesBtn = document.getElementById('viewOpportunitiesBtn');
    if (viewOpportunitiesBtn) {
        viewOpportunitiesBtn.addEventListener('click', function() {
            // Navigate to Tier Tracking tab
            switchToTab('Tier Tracking');
            
            // Show a brief notification
            showNotification('Navigated to Tier Tracking for opportunities analysis', 'success');
        });
    }
}

/**
 * Switch to a specific tab
 */
function switchToTab(tabName) {
    // Remove active from all nav tabs
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => tab.classList.remove('active'));
    
    // Add active to target tab
    const targetTab = document.querySelector(`[data-tab="${tabName}"]`);
    if (targetTab) {
        targetTab.classList.add('active');
    }
    
    // Hide all page content
    const pageContents = document.querySelectorAll('.page-content');
    pageContents.forEach(page => page.classList.remove('active'));
    
    // Show target page
    const targetPage = document.querySelector(`[data-page="${tabName}"]`);
    if (targetPage) {
        targetPage.classList.add('active');
    }
}

/**
 * Initialize granularity controls for Payment History in left rail
 */
function initializeGranularityControls() {
    // Compact granularity buttons in left rail
    const granularityBtns = document.querySelectorAll('.granularity-btn-compact');
    granularityBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active from all buttons
            granularityBtns.forEach(b => b.classList.remove('active'));
            
            // Add active to clicked button
            this.classList.add('active');
            
            const granularity = this.getAttribute('data-granularity');
            
            // Update the info text
            updateGranularityInfo(granularity);
            
            // Update payment table based on granularity
            updatePaymentTableGranularity(granularity);
            
            // Update purchase trend chart based on granularity
            updatePurchaseTrendChart(granularity);
            
            // Show loading state
            showGranularityLoadingState();
        });
    });
}

/**
 * Update granularity info display
 */
function updateGranularityInfo(granularity) {
    const currentGranularityElement = document.querySelector('.current-granularity');
    if (currentGranularityElement) {
        currentGranularityElement.textContent = granularity.charAt(0).toUpperCase() + granularity.slice(1);
    }
}

/**
 * Initialize history chart interactions
 */
function initializeHistoryInteractions() {
    // Add hover effects and click interactions to history bars
    const historyBars = document.querySelectorAll('.history-bar');
    historyBars.forEach(bar => {
        bar.addEventListener('mouseenter', function() {
            const amount = this.getAttribute('data-amount');
            if (amount && amount > 0) {
                showHistoryTooltip(this, amount);
            }
        });
        
        bar.addEventListener('mouseleave', function() {
            hideHistoryTooltip();
        });
        
        bar.addEventListener('click', function() {
            const amount = this.getAttribute('data-amount');
            const period = this.parentElement.querySelector('.period-label').textContent;
            showHistoryDetails(period, amount);
        });
    });

    // Facility table interactions
    const facilityRows = document.querySelectorAll('.facility-table tbody tr');
    facilityRows.forEach(row => {
        if (!row.classList.contains('subtotal-row') && !row.classList.contains('remaining-row')) {
            row.addEventListener('click', function() {
                showFacilityDetails(this);
            });
        }
    });
}

/**
 * Update payment table granularity based on granularity
 */
function updatePaymentTableGranularity(granularity) {
    const paymentTableBody = document.querySelector('#paymentTableBody');
    if (!paymentTableBody) return;

    console.log(`Updating payment table to show ${granularity} data`);
    
    // Clear existing rows
    paymentTableBody.innerHTML = '';
    
    // Add new rows based on granularity
    if (granularity === 'monthly') {
        updateTableWithMonthlyData(paymentTableBody);
    } else if (granularity === 'weekly') {
        updateTableWithWeeklyData(paymentTableBody);
    } else {
        // Default quarterly view
        updateTableWithQuarterlyData(paymentTableBody);
    }
}

/**
 * Show loading state for granularity changes
 */
function showGranularityLoadingState() {
    const paymentTable = document.querySelector('.payment-table');
    if (paymentTable) {
        paymentTable.style.opacity = '0.6';
        
        setTimeout(() => {
            paymentTable.style.opacity = '1';
            showGranularityUpdateSuccess();
        }, 1000);
    }
}

/**
 * Show granularity update success
 */
function showGranularityUpdateSuccess() {
    const banner = document.querySelector('.banner-text');
    if (banner) {
        const originalText = banner.textContent;
        banner.textContent = '✓ Payment history updated with new view granularity';
        banner.style.color = '#065f46';
        
        setTimeout(() => {
            banner.textContent = originalText;
            banner.style.color = '';
        }, 3000);
    }
}

/**
 * Show history tooltip on bar hover
 */
function showHistoryTooltip(bar, amount) {
    // Remove any existing tooltip
    hideHistoryTooltip();
    
    const tooltip = document.createElement('div');
    tooltip.className = 'history-tooltip';
    tooltip.innerHTML = `
        <div class="tooltip-content">
            <div class="tooltip-amount">$${formatCurrency(parseInt(amount))}</div>
            <div class="tooltip-label">Rebate Earned</div>
        </div>
    `;
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(17, 24, 39, 0.9);
        color: white;
        padding: 0.5rem;
        border-radius: 0.375rem;
        font-size: 0.75rem;
        z-index: 1000;
        pointer-events: none;
        transform: translateX(-50%);
        white-space: nowrap;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = bar.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
}

/**
 * Hide history tooltip
 */
function hideHistoryTooltip() {
    const tooltip = document.querySelector('.history-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

/**
 * Show detailed history information
 */
function showHistoryDetails(period, amount) {
    const message = amount > 0 
        ? `Period: ${period}\nRebate Earned: $${formatCurrency(parseInt(amount))}\n\nWould you like to:\n1. View facility breakdown\n2. Export payment details\n3. Share with customer`
        : `Period: ${period}\nNo rebate earned (did not achieve tier thresholds)\n\nWould you like to:\n1. View purchase details\n2. Analyze tier opportunities`;
    
    const choice = prompt(message + '\n\nEnter choice (1-3):');
    
    if (choice === '1') {
        alert('Facility breakdown view would open here');
    } else if (choice === '2') {
        simulateExport(`${period} Payment Details`);
    } else if (choice === '3' && amount > 0) {
        shareWithCustomer();
    }
}

/**
 * Show facility details
 */
function showFacilityDetails(row) {
    const cells = row.querySelectorAll('td');
    if (cells.length >= 6) {
        const facilityName = cells[0].textContent;
        const location = cells[1].textContent;
        const purchaseVolume = cells[2].textContent;
        const percentage = cells[3].textContent;
        const allocatedRebate = cells[4].textContent;
        
        const message = `Facility Details:\n\nName: ${facilityName}\nLocation: ${location}\nPurchase Volume: ${purchaseVolume}\nPercentage of Total: ${percentage}\nAllocated Rebate: ${allocatedRebate}\n\nActions:\n1. View detailed purchase history\n2. Export facility report\n3. Contact facility administrator`;
        
        const choice = prompt(message + '\n\nEnter choice (1-3):');
        
        if (choice === '1') {
            alert('Detailed facility purchase history would open here');
        } else if (choice === '2') {
            simulateExport(`${facilityName} Facility Report`);
        } else if (choice === '3') {
            alert('Contact information and communication tools would open here');
        }
    }
}

/**
 * Update table with monthly data 
 */
function updateTableWithMonthlyData(tbody) {
    const monthlyData = [
        { period: 'Oct 2023', purchases: '$1,480,000', earned: '$87,467', paid: '$87,467', pending: '$0', date: '11/15/2023', status: 'paid' },
        { period: 'Nov 2023', purchases: '$1,650,000', earned: '$87,467', paid: '$87,467', pending: '$0', date: '12/15/2023', status: 'paid' },
        { period: 'Dec 2023', purchases: '$1,450,000', earned: '$87,466', paid: '$87,466', pending: '$0', date: '01/15/2024', status: 'paid' },
        { period: 'Jan 2024', purchases: '$1,380,000', earned: '$50,400', paid: '$50,400', pending: '$0', date: '02/15/2024', status: 'paid' },
        { period: 'Feb 2024', purchases: '$1,420,000', earned: '$50,400', paid: '$50,400', pending: '$0', date: '03/15/2024', status: 'paid' },
        { period: 'Mar 2024', purchases: '$1,400,000', earned: '$50,400', paid: '$50,400', pending: '$0', date: '04/15/2024', status: 'paid' },
        { period: 'Apr 2024', purchases: '$1,240,000', earned: '$24,000', paid: '$24,000', pending: '$0', date: '05/15/2024', status: 'paid' },
        { period: 'May 2024', purchases: '$1,240,000', earned: '$24,000', paid: '$24,000', pending: '$0', date: '06/15/2024', status: 'paid' },
        { period: 'Jun 2024', purchases: '$1,240,000', earned: '$24,000', paid: '$24,000', pending: '$0', date: '07/15/2024', status: 'paid' },
        { period: 'Jul 2024', purchases: '$1,000,000', earned: '$0', paid: '$0', pending: '$0', date: 'N/A', status: 'none' },
        { period: 'Aug 2024', purchases: '$1,000,000', earned: '$0', paid: '$0', pending: '$0', date: 'N/A', status: 'none' },
        { period: 'Sep 2024', purchases: '$1,000,000', earned: '$0', paid: '$0', pending: '$0', date: 'N/A', status: 'none' },
        { period: 'Oct 2024', purchases: '$1,521,987', earned: '$48,619', paid: '$40,000', pending: '$8,619', date: '11/15/2024', status: 'partial' },
        { period: 'Nov 2024', purchases: '$1,521,988', earned: '$48,618', paid: '$40,000', pending: '$8,618', date: '12/15/2024', status: 'partial' },
        { period: 'Dec 2024', purchases: '$1,521,988', earned: '$48,619', paid: '$40,000', pending: '$8,619', date: '01/15/2025', status: 'partial' },
        { period: 'Jan 2025', purchases: '$1,418,067', earned: '$27,814', paid: '$0', pending: '$27,814', date: '02/28/2025', status: 'pending' },
        { period: 'Feb 2025', purchases: '$1,418,067', earned: '$27,814', paid: '$0', pending: '$27,814', date: '03/30/2025', status: 'pending' },
        { period: 'Mar 2025', purchases: '$1,418,066', earned: '$27,815', paid: '$0', pending: '$27,815', date: '04/30/2025', status: 'pending' },
        { period: 'Apr 2025 (Current)', purchases: '$471,000', earned: '$0', paid: '$0', pending: '$0', date: '05/30/2025', status: 'projected' }
    ];

    monthlyData.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.period}</td>
            <td>${row.purchases}</td>
            <td>${row.earned}</td>
            <td>${row.paid}</td>
            <td>${row.pending}</td>
            <td>${row.date}</td>
            <td><span class="status-badge ${row.status}">${getStatusLabel(row.status)}</span></td>
        `;
        tbody.appendChild(tr);
    });
}

/**
 * Update table with weekly data 
 */
function updateTableWithWeeklyData(tbody) {
    const weeklyData = [
        { period: 'Week 14, 2025 (Apr 7-13)', purchases: '$117,750', earned: '$0', paid: '$0', pending: '$0', date: 'TBD', status: 'projected' },
        { period: 'Week 13, 2025 (Mar 31-Apr 6)', purchases: '$117,750', earned: '$0', paid: '$0', pending: '$0', date: 'TBD', status: 'projected' },
        { period: 'Week 12, 2025 (Mar 24-30)', purchases: '$117,750', earned: '$0', paid: '$0', pending: '$0', date: 'TBD', status: 'projected' },
        { period: 'Week 11, 2025 (Mar 17-23)', purchases: '$117,750', earned: '$0', paid: '$0', pending: '$0', date: 'TBD', status: 'projected' },
        { period: 'Week 10, 2025 (Mar 10-16)', purchases: '$354,517', earned: '$6,954', paid: '$0', pending: '$6,954', date: '04/15/2025', status: 'pending' },
        { period: 'Week 9, 2025 (Mar 3-9)', purchases: '$354,516', earned: '$6,954', paid: '$0', pending: '$6,954', date: '04/08/2025', status: 'pending' },
        { period: 'Week 8, 2025 (Feb 24-Mar 2)', purchases: '$354,516', earned: '$6,954', paid: '$0', pending: '$6,954', date: '04/01/2025', status: 'pending' },
        { period: 'Week 7, 2025 (Feb 17-23)', purchases: '$354,517', earned: '$6,953', paid: '$0', pending: '$6,953', date: '03/25/2025', status: 'pending' }
    ];

    weeklyData.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.period}</td>
            <td>${row.purchases}</td>
            <td>${row.earned}</td>
            <td>${row.paid}</td>
            <td>${row.pending}</td>
            <td>${row.date}</td>
            <td><span class="status-badge ${row.status}">${getStatusLabel(row.status)}</span></td>
        `;
        tbody.appendChild(tr);
    });
}

/**
 * Update table with quarterly data 
 */
function updateTableWithQuarterlyData(tbody) {
    const quarterlyData = [
        { period: 'CY23 Q4', purchases: '$4,580,000', earned: '$262,400', paid: '$262,400', pending: '$0', date: '02/15/2024', status: 'paid' },
        { period: 'CY24 Q1', purchases: '$4,200,000', earned: '$151,200', paid: '$151,200', pending: '$0', date: '05/15/2024', status: 'paid' },
        { period: 'CY24 Q2', purchases: '$3,720,000', earned: '$72,000', paid: '$72,000', pending: '$0', date: '08/15/2024', status: 'paid' },
        { period: 'CY24 Q3', purchases: '$3,000,000', earned: '$0', paid: '$0', pending: '$0', date: 'N/A', status: 'none' },
        { period: 'CY24 Q4', purchases: '$4,565,963', earned: '$145,856', paid: '$120,000', pending: '$25,856', date: '02/15/2025', status: 'partial' },
        { period: 'CY25 Q1', purchases: '$4,254,200', earned: '$83,443', paid: '$0', pending: '$83,443', date: '05/30/2025', status: 'pending' },
        { period: 'CY25 Q2 (Current)', purchases: '$1,413,000', earned: '$0', paid: '$0', pending: '$0', date: '08/30/2025', status: 'projected' }
    ];

    quarterlyData.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.period}</td>
            <td>${row.purchases}</td>
            <td>${row.earned}</td>
            <td>${row.paid}</td>
            <td>${row.pending}</td>
            <td>${row.date}</td>
            <td><span class="status-badge ${row.status}">${getStatusLabel(row.status)}</span></td>
        `;
        tbody.appendChild(tr);
    });
}

/**
 * Get status label for display
 */
function getStatusLabel(status) {
    const labels = {
        'paid': 'Paid',
        'pending': 'Pending',
        'partial': 'Partially Paid',
        'projected': 'No Rebate (Projected)',
        'none': 'No Rebate'
    };
    return labels[status] || status;
}

// Initialize rebate dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Call original initialization
    initializeIcons();
    initializeTabNavigation();
    initializeSlicers();
    initializeToolbarButtons();
    
    // Initialize rebate-specific functionality
    initializeRebateDashboard();
    
    // Initialize operational dashboard functionality
    initializeOperationalDashboard();
    
    setRebateInitialState();
});

/**
 * Initialize forecast calculator
 */
function initializeForecastCalculator() {
    const forecastInput = document.getElementById('forecastPurchaseInput');
    
    if (forecastInput) {
        forecastInput.addEventListener('input', function() {
            updateForecastCalculations();
        });
        
        // Initial calculation
        updateForecastCalculations();
    }
}

/**
 * Initialize product mix editor
 */
function initializeProductMixEditor() {
    const productSliders = document.querySelectorAll('.product-slider');
    const estimateButton = document.getElementById('estimateButton');
    
    productSliders.forEach(slider => {
        slider.addEventListener('input', function() {
            updateProductMixDisplay();
            updateForecastCalculations();
        });
    });
    
    if (estimateButton) {
        estimateButton.addEventListener('click', function() {
            handleEstimateClick();
        });
    }
    
    // Initial display update
    updateProductMixDisplay();
}

/**
 * Update forecast calculations based on input
 */
function updateForecastCalculations() {
    const forecastInput = document.getElementById('forecastPurchaseInput');
    const projectedRebateEl = document.getElementById('projectedRebate');
    const tierOutcomeEl = document.getElementById('tierOutcome');
    const effectiveRateEl = document.getElementById('effectiveRate');
    
    if (!forecastInput || !projectedRebateEl || !tierOutcomeEl || !effectiveRateEl) return;
    
    const totalForecast = parseFloat(forecastInput.value) || 0;
    
    // Get current product mix percentages
    const productMix = getCurrentProductMix();
    
    // Calculate tier and rebates
    const { tier, totalRebate, effectiveRate } = calculateRebateFromForecast(totalForecast, productMix);
    
    // Update display
    projectedRebateEl.textContent = `$${formatCurrency(totalRebate)}`;
    tierOutcomeEl.textContent = tier || 'None';
    tierOutcomeEl.className = `result-value ${tier ? tier.toLowerCase().replace(' ', '-') : ''}`;
    effectiveRateEl.textContent = `${effectiveRate.toFixed(2)}%`;
    
    // Update product breakdown
    updateProductRebateBreakdown(totalForecast, productMix, tier);
    
    // Update agreement table highlighting
    updateAgreementTableHighlighting(tier);
}

/**
 * Get current product mix percentages
 */
function getCurrentProductMix() {
    const productSliders = document.querySelectorAll('.product-slider');
    const mix = {};
    
    productSliders.forEach(slider => {
        const product = slider.getAttribute('data-product');
        mix[product] = parseInt(slider.value);
    });
    
    return mix;
}

/**
 * Calculate rebate from forecast amount and product mix
 */
function calculateRebateFromForecast(totalForecast, productMix) {
    // Tier thresholds and rates
    const tiers = [
        {
            name: 'Tier 1',
            threshold: 3350000,
            rates: { 'Brady': 6.0, 'CRT-P': 4.0, 'Tachy': 5.0, 'Micra VR': 5.0, 'Micra AV': 3.0 }
        },
        {
            name: 'Tier 2', 
            threshold: 3850000,
            rates: { 'Brady': 9.0, 'CRT-P': 7.0, 'Tachy': 5.0, 'Micra VR': 5.0, 'Micra AV': 3.0 }
        },
        {
            name: 'Tier 3',
            threshold: 4350000,
            rates: { 'Brady': 16.0, 'CRT-P': 12.0, 'Tachy': 5.0, 'Micra VR': 5.0, 'Micra AV': 3.0 }
        }
    ];
    
    // Determine tier based on total forecast
    let achievedTier = null;
    for (let i = tiers.length - 1; i >= 0; i--) {
        if (totalForecast >= tiers[i].threshold) {
            achievedTier = tiers[i];
            break;
        }
    }
    
    let totalRebate = 0;
    
    if (achievedTier) {
        // Calculate rebate for each product based on mix
        Object.keys(productMix).forEach(product => {
            const productAmount = totalForecast * (productMix[product] / 100);
            const rebateRate = achievedTier.rates[product] || 0;
            totalRebate += productAmount * (rebateRate / 100);
        });
    }
    
    const effectiveRate = totalForecast > 0 ? (totalRebate / totalForecast) * 100 : 0;
    
    return {
        tier: achievedTier ? achievedTier.name : null,
        totalRebate: totalRebate,
        effectiveRate: effectiveRate
    };
}

/**
 * Update product rebate breakdown display
 */
function updateProductRebateBreakdown(totalForecast, productMix, tier) {
    const breakdownEl = document.getElementById('productRebateBreakdown');
    const productListEl = breakdownEl ? breakdownEl.querySelector('.product-rebate-list') : null;
    
    if (!productListEl) return;
    
    // Get tier rates
    const tierRates = {
        'Tier 1': { 'Brady': 6.0, 'CRT-P': 4.0, 'Tachy': 5.0, 'Micra VR': 5.0, 'Micra AV': 3.0 },
        'Tier 2': { 'Brady': 9.0, 'CRT-P': 7.0, 'Tachy': 5.0, 'Micra VR': 5.0, 'Micra AV': 3.0 },
        'Tier 3': { 'Brady': 16.0, 'CRT-P': 12.0, 'Tachy': 5.0, 'Micra VR': 5.0, 'Micra AV': 3.0 }
    };
    
    const currentRates = tier ? tierRates[tier] : {};
    
    // Clear and rebuild product list
    productListEl.innerHTML = '';
    
    Object.keys(productMix).forEach(product => {
        const percentage = productMix[product];
        const productAmount = totalForecast * (percentage / 100);
        const rebateRate = currentRates[product] || 0;
        const rebateAmount = productAmount * (rebateRate / 100);
        
        const itemEl = document.createElement('div');
        itemEl.className = 'product-rebate-item';
        itemEl.innerHTML = `
            <span class="product-name">${product} (${percentage}%)</span>
            <span class="product-amount">$${formatCurrency(rebateAmount)}</span>
            <span class="product-rate">${rebateRate}%</span>
        `;
        
        productListEl.appendChild(itemEl);
    });
}

/**
 * Update product mix display
 */
function updateProductMixDisplay() {
    const productSliders = document.querySelectorAll('.product-slider');
    const totalPercentageEl = document.getElementById('totalPercentage');
    const percentageStatusEl = document.getElementById('percentageStatus');
    const estimateButton = document.getElementById('estimateButton');
    
    let totalPercentage = 0;
    
    productSliders.forEach(slider => {
        const percentage = parseInt(slider.value);
        totalPercentage += percentage;
        
        // Update percentage display
        const display = slider.parentElement.querySelector('.percentage-display');
        if (display) {
            display.textContent = `${percentage}%`;
        }
    });
    
    // Update total percentage display
    if (totalPercentageEl) {
        totalPercentageEl.textContent = `${totalPercentage}%`;
    }
    
    // Update status
    if (percentageStatusEl) {
        if (totalPercentage === 100) {
            percentageStatusEl.textContent = '✓ Valid';
            percentageStatusEl.className = 'percentage-status valid';
        } else {
            percentageStatusEl.textContent = `⚠ ${totalPercentage > 100 ? 'Over' : 'Under'} 100%`;
            percentageStatusEl.className = 'percentage-status invalid';
        }
    }
    
    // Update button state
    if (estimateButton) {
        estimateButton.disabled = totalPercentage !== 100;
    }
}

/**
 * Handle estimate button click
 */
function handleEstimateClick() {
    const totalPercentage = calculateTotalPercentage();
    
    if (totalPercentage !== 100) {
        // Show notification for invalid percentage
        showPercentageNotification(`Total percentage is ${totalPercentage}%. Please adjust to exactly 100% before estimating.`);
        return;
    }
    
    // Perform estimation
    updateForecastCalculations();
    showEstimationSuccess();
}

/**
 * Calculate total percentage
 */
function calculateTotalPercentage() {
    const productSliders = document.querySelectorAll('.product-slider');
    let total = 0;
    
    productSliders.forEach(slider => {
        total += parseInt(slider.value);
    });
    
    return total;
}

/**
 * Show percentage notification
 */
function showPercentageNotification(message) {
    const banner = document.querySelector('.banner-text');
    if (banner) {
        const originalText = banner.textContent;
        banner.textContent = `⚠ ${message}`;
        banner.style.color = '#dc2626';
        
        setTimeout(() => {
            banner.textContent = originalText;
            banner.style.color = '';
        }, 5000);
    }
}

/**
 * Show estimation success
 */
function showEstimationSuccess() {
    const banner = document.querySelector('.banner-text');
    if (banner) {
        const originalText = banner.textContent;
        banner.textContent = '✓ Rebate estimation completed! All calculations updated based on current product mix.';
        banner.style.color = '#065f46';
        
        setTimeout(() => {
            banner.textContent = originalText;
            banner.style.color = '';
        }, 4000);
    }
}

/**
 * Update agreement table highlighting
 */
function updateAgreementTableHighlighting(achievedTier) {
    const agreementTable = document.getElementById('rebateAgreementTable');
    if (!agreementTable) return;
    
    const rows = agreementTable.querySelectorAll('tbody tr');
    
    rows.forEach(row => {
        const tierCell = row.cells[0];
        if (tierCell && tierCell.textContent === achievedTier) {
            row.classList.add('tier-achieved');
        } else {
            row.classList.remove('tier-achieved');
        }
    });
}

/**
 * Update enterprise account data when selection changes
 */
function updateEnterpriseAccountData(accountKey) {
    // Enterprise account data
    const accountData = {
        'banner': {
            facilities: 325,
            contractPeriod: 'Apr 2024 - Apr 2026',
            rebateType: 'Tiered Annual'
        },
        'mayo': {
            facilities: 65,
            contractPeriod: 'Jan 2024 - Jan 2027',
            rebateType: 'Volume-Based'
        },
        'cleveland': {
            facilities: 18,
            contractPeriod: 'Mar 2024 - Mar 2026',
            rebateType: 'Tiered Annual'
        },
        'kaiser': {
            facilities: 39,
            contractPeriod: 'Jul 2023 - Jul 2026',
            rebateType: 'Performance-Based'
        },
        'intermountain': {
            facilities: 24,
            contractPeriod: 'Sep 2024 - Sep 2027',
            rebateType: 'Hybrid Model'
        }
    };
    
    const selectedData = accountData[accountKey] || accountData['banner'];
    
    // Update customer stats
    document.getElementById('facilitiesCount').textContent = selectedData.facilities;
    document.getElementById('contractPeriod').textContent = selectedData.contractPeriod;
    document.getElementById('rebateType').textContent = selectedData.rebateType;
}

/**
 * Update tier alerts based on selected enterprise account
 */
function updateTierAlerts(accountKey) {
    // Tier alert data for different accounts
    const alertData = {
        'banner': {
            opportunityTitle: '46% increase needed',
            opportunityDesc: 'to unlock $201K rebates',
            timeTitle: '35 days remaining',
            timeDesc: 'until quarter end'
        },
        'mayo': {
            opportunityTitle: '22% increase needed',
            opportunityDesc: 'to unlock $185K rebates',
            timeTitle: '42 days remaining',
            timeDesc: 'until contract milestone'
        },
        'cleveland': {
            opportunityTitle: '38% increase needed',
            opportunityDesc: 'to unlock $95K rebates',
            timeTitle: '28 days remaining',
            timeDesc: 'until tier deadline'
        },
        'kaiser': {
            opportunityTitle: '15% increase needed',
            opportunityDesc: 'to unlock $142K rebates',
            timeTitle: '51 days remaining',
            timeDesc: 'until performance review'
        },
        'intermountain': {
            opportunityTitle: '67% increase needed',
            opportunityDesc: 'to unlock $78K rebates',
            timeTitle: '19 days remaining',
            timeDesc: 'until quarter end'
        }
    };
    
    const selectedAlert = alertData[accountKey] || alertData['banner'];
    
    // Update tier alert content
    document.getElementById('alertOpportunityTitle').textContent = selectedAlert.opportunityTitle;
    document.getElementById('alertOpportunityDesc').textContent = selectedAlert.opportunityDesc;
    document.getElementById('alertTimeTitle').textContent = selectedAlert.timeTitle;
    document.getElementById('alertTimeDesc').textContent = selectedAlert.timeDesc;
    
    // Show success notification
    showAccountChangeSuccess(accountKey);
}

/**
 * Update Action Required banner for selected enterprise account
 */
function updateActionRequiredBanner(accountKey) {
    // Action Required banner data for different accounts
    const bannerData = {
        'banner': {
            text: '<strong>Action Required:</strong> Banner Health is $1.937M short of Tier 1 threshold. Current run rate will NOT achieve rebate eligibility by quarter end.',
            type: 'warning'
        },
        'mayo': {
            text: '<strong>On Track:</strong> Mayo Clinic is projected to achieve Tier 1 with current run rate. Continue monitoring to maintain eligibility.',
            type: 'success'
        },
        'cleveland': {
            text: '<strong>Action Required:</strong> Cleveland Clinic is $1.700M short of Tier 1 threshold. Significant increase needed to achieve rebate eligibility.',
            type: 'warning'
        },
        'kaiser': {
            text: '<strong>Excellent Performance:</strong> Kaiser Permanente is exceeding Tier 1 requirements. Consider strategies to reach Tier 2 for higher rebates.',
            type: 'success'
        },
        'intermountain': {
            text: '<strong>Critical Action Required:</strong> Intermountain Healthcare is $2.305M short of Tier 1. Immediate intervention needed to achieve any rebate eligibility.',
            type: 'critical'
        }
    };
    
    const selectedBanner = bannerData[accountKey] || bannerData['banner'];
    const bannerElement = document.getElementById('actionRequiredText');
    const bannerContainer = document.getElementById('actionRequiredBanner');
    
    if (bannerElement) {
        bannerElement.innerHTML = selectedBanner.text;
    }
    
    if (bannerContainer) {
        // Update banner styling based on type
        bannerContainer.classList.remove('alert-success', 'alert-critical');
        if (selectedBanner.type === 'success') {
            bannerContainer.classList.add('alert-success');
        } else if (selectedBanner.type === 'critical') {
            bannerContainer.classList.add('alert-critical');
        }
    }
}

/**
 * Update Customer Summary for selected enterprise account
 */
function updateCustomerSummary(accountKey) {
    // Customer Summary data for different enterprise accounts
    const summaryData = {
        'banner': {
            currentPurchases: '$1,413,000',
            progressTier1: '42.1%',
            facilities: '325 of 325',
            additionalNeeded: '$1,937,000',
            potentialRebate: '$201,000',
            daysRemaining: '35 days',
            bestQuarter: 'Q4-23: $4.6M (Tier 3)',
            totalRebates: '$485,000',
            avgGrowth: '+12.5%'
        },
        'mayo': {
            currentPurchases: '$2,850,000',
            progressTier1: '85.0%',
            facilities: '428 of 450',
            additionalNeeded: '$500,000',
            potentialRebate: '$173,400',
            daysRemaining: '35 days',
            bestQuarter: 'Q1-24: $5.2M (Tier 3)',
            totalRebates: '$625,000',
            avgGrowth: '+12.3%'
        },
        'cleveland': {
            currentPurchases: '$875,000',
            progressTier1: '26.0%',
            facilities: '189 of 195',
            additionalNeeded: '$2,475,000',
            potentialRebate: '$201,000',
            daysRemaining: '35 days',
            bestQuarter: 'Q3-23: $3.8M (Tier 1)',
            totalRebates: '$342,000',
            avgGrowth: '+5.2%'
        },
        'kaiser': {
            currentPurchases: '$3,125,000',
            progressTier1: '93.0%',
            facilities: '672 of 672',
            additionalNeeded: '$225,000',
            potentialRebate: '$173,400',
            daysRemaining: '35 days',
            bestQuarter: 'Q4-23: $6.1M (Tier 3)',
            totalRebates: '$892,500',
            avgGrowth: '+15.7%'
        },
        'intermountain': {
            currentPurchases: '$625,000',
            progressTier1: '19.0%',
            facilities: '147 of 160',
            additionalNeeded: '$2,725,000',
            potentialRebate: '$201,000',
            daysRemaining: '35 days',
            bestQuarter: 'Q2-23: $3.2M (None)',
            totalRebates: '$158,000',
            avgGrowth: '+3.1%'
        }
    };
    
    const selectedData = summaryData[accountKey] || summaryData['banner'];
    
    // Update all summary elements
    document.getElementById('summaryCurrentPurchases').textContent = selectedData.currentPurchases;
    document.getElementById('summaryProgressTier1').textContent = selectedData.progressTier1;
    document.getElementById('summaryFacilities').textContent = selectedData.facilities;
    document.getElementById('summaryAdditionalNeeded').textContent = selectedData.additionalNeeded;
    document.getElementById('summaryPotentialRebate').textContent = selectedData.potentialRebate;
    document.getElementById('summaryDaysRemaining').textContent = selectedData.daysRemaining;
    document.getElementById('summaryBestQuarter').textContent = selectedData.bestQuarter;
    document.getElementById('summaryTotalRebates').textContent = selectedData.totalRebates;
    document.getElementById('summaryAvgGrowth').textContent = selectedData.avgGrowth;
}

/**
 * Update Tier Tracking data for selected enterprise account
 */
function updateTierTrackingData(accountKey) {
    // Tier tracking data for different enterprise accounts
    const tierTrackingData = {
        'banner': {
            current: { amount: 1413000, percentage: 28, text: '$1.413M' },
            forecast: { amount: 2296000, percentage: 46, text: '$2.296M' },
            gapToTier1: { amount: 1937000, percentage: 58, text: '$1.937M' },
            tier1Gap: 1937000,
            tier2Gap: 2437000,
            tier3Gap: 2937000,
            tier1Status: 'Not Achieved',
            tier2Status: 'Not Achieved',
            tier3Status: 'Not Achieved',
            opportunity: '58% increase in purchases would unlock $201K in rebates'
        },
        'mayo': {
            current: { amount: 2890000, percentage: 86, text: '$2.890M' },
            forecast: { amount: 3450000, percentage: 103, text: '$3.450M' },
            gapToTier1: { amount: 460000, percentage: 14, text: '$460K' },
            tier1Gap: 460000,
            tier2Gap: 960000,
            tier3Gap: 1460000,
            tier1Status: 'Achievable',
            tier2Status: 'Not Achieved',
            tier3Status: 'Not Achieved',
            opportunity: '14% increase in purchases would unlock $173K in rebates'
        },
        'cleveland': {
            current: { amount: 1650000, percentage: 49, text: '$1.650M' },
            forecast: { amount: 2475000, percentage: 74, text: '$2.475M' },
            gapToTier1: { amount: 1700000, percentage: 51, text: '$1.700M' },
            tier1Gap: 1700000,
            tier2Gap: 2200000,
            tier3Gap: 2700000,
            tier1Status: 'Not Achieved',
            tier2Status: 'Not Achieved',
            tier3Status: 'Not Achieved',
            opportunity: '51% increase in purchases would unlock $201K in rebates'
        },
        'kaiser': {
            current: { amount: 4125000, percentage: 123, text: '$4.125M' },
            forecast: { amount: 4650000, percentage: 139, text: '$4.650M' },
            gapToTier1: { amount: 0, percentage: 0, text: '$0' },
            tier1Gap: 0,
            tier2Gap: 0,
            tier3Gap: 225000,
            tier1Status: 'Achieved',
            tier2Status: 'Achieved',
            tier3Status: 'Not Achieved',
            opportunity: 'Currently achieving Tier 2! Focus on Tier 3 for maximum rebates'
        },
        'intermountain': {
            current: { amount: 1045000, percentage: 31, text: '$1.045M' },
            forecast: { amount: 1568000, percentage: 47, text: '$1.568M' },
            gapToTier1: { amount: 2305000, percentage: 69, text: '$2.305M' },
            tier1Gap: 2305000,
            tier2Gap: 2805000,
            tier3Gap: 3305000,
            tier1Status: 'Not Achieved',
            tier2Status: 'Not Achieved',
            tier3Status: 'Not Achieved',
            opportunity: '69% increase in purchases would unlock $201K in rebates'
        }
    };
    
    const selectedData = tierTrackingData[accountKey] || tierTrackingData['banner'];
    
    // Update progress bars
    const currentFill = document.getElementById('currentProgressFill');
    const forecastFill = document.getElementById('forecastProgressFill');
    if (currentFill) currentFill.style.width = `${selectedData.current.percentage}%`;
    if (forecastFill) forecastFill.style.width = `${selectedData.forecast.percentage}%`;
    
    // Update legend text
    const currentProgressText = document.getElementById('currentProgressText');
    const forecastProgressText = document.getElementById('forecastProgressText');
    const gapToTier1Text = document.getElementById('gapToTier1Text');
    
    if (currentProgressText) currentProgressText.textContent = `Current: ${selectedData.current.text} (May 26)`;
    if (forecastProgressText) forecastProgressText.textContent = `Forecast: ${selectedData.forecast.text} (June 30)`;
    if (gapToTier1Text) gapToTier1Text.textContent = `Gap to Tier 1: ${selectedData.gapToTier1.text} (${selectedData.gapToTier1.percentage}% increase needed)`;
    
    // Update opportunity callouts
    const opportunityText = document.getElementById('opportunityText');
    if (opportunityText) opportunityText.innerHTML = `<strong>Opportunity:</strong> ${selectedData.opportunity}`;
    
    // Update tier cards
    const tier1Gap = document.getElementById('tier1Gap');
    const tier2Gap = document.getElementById('tier2Gap');
    const tier3Gap = document.getElementById('tier3Gap');
    const tier1Status = document.getElementById('tier1Status');
    const tier2Status = document.getElementById('tier2Status');
    const tier3Status = document.getElementById('tier3Status');
    
    if (tier1Gap) tier1Gap.textContent = `Gap: $${(selectedData.tier1Gap / 1000).toFixed(0)}K`;
    if (tier2Gap) tier2Gap.textContent = `Gap: $${(selectedData.tier2Gap / 1000).toFixed(0)}K`;
    if (tier3Gap) tier3Gap.textContent = `Gap: $${(selectedData.tier3Gap / 1000).toFixed(0)}K`;
    
    if (tier1Status) {
        tier1Status.textContent = selectedData.tier1Status;
        tier1Status.className = selectedData.tier1Status === 'Achieved' ? 'tier-status achieved' : 
                                selectedData.tier1Status === 'Achievable' ? 'tier-status achievable' : 'tier-status not-achieved';
    }
    if (tier2Status) {
        tier2Status.textContent = selectedData.tier2Status;
        tier2Status.className = selectedData.tier2Status === 'Achieved' ? 'tier-status achieved' : 
                                selectedData.tier2Status === 'Achievable' ? 'tier-status achievable' : 'tier-status not-achieved';
    }
    if (tier3Status) {
        tier3Status.textContent = selectedData.tier3Status;
        tier3Status.className = selectedData.tier3Status === 'Achieved' ? 'tier-status achieved' : 
                                selectedData.tier3Status === 'Achievable' ? 'tier-status achievable' : 'tier-status not-achieved';
    }
}

/**
 * Update KPI values for selected enterprise account
 */
function updateKPIValuesForAccount(accountKey) {
    // KPI data for different enterprise accounts
    const kpiData = {
        'banner': {
            currentQuarterPurchases: '$1.413M',
            currentQuarterSubtitle: 'Q2 CY25 (as of 5/26/25) • 42% of Tier 1',
            currentQuarterTrend: '+8.5%',
            projectedQuarterEnd: '$2.296M',
            projectedQuarterSubtitle: 'Based on current run rate (68% of Tier 1)',
            rebateEligibilityStatus: 'Not Eligible',
            rebateEligibilitySubtitle: 'Need $1.937M more for Tier 1 (6.0% avg rate)',
            potentialRebateValue: '$0',
            potentialRebateSubtitle: 'Could be $201K if Tier 1 achieved'
        },
        'mayo': {
            currentQuarterPurchases: '$2.850M',
            currentQuarterSubtitle: 'Q2 CY25 (as of 5/26/25) • 85% of Tier 1',
            currentQuarterTrend: '+12.3%',
            projectedQuarterEnd: '$3.420M',
            projectedQuarterSubtitle: 'Based on current run rate (102% of Tier 1)',
            rebateEligibilityStatus: 'Tier 1 Eligible',
            rebateEligibilitySubtitle: 'On track to achieve Tier 1 (4.0% avg rate)',
            potentialRebateValue: '$137K',
            potentialRebateSubtitle: 'Could be $185K if performance maintained'
        },
        'cleveland': {
            currentQuarterPurchases: '$875K',
            currentQuarterSubtitle: 'Q2 CY25 (as of 5/26/25) • 26% of Tier 1',
            currentQuarterTrend: '+5.2%',
            projectedQuarterEnd: '$1.650M',
            projectedQuarterSubtitle: 'Based on current run rate (49% of Tier 1)',
            rebateEligibilityStatus: 'Not Eligible',
            rebateEligibilitySubtitle: 'Need $1.700M more for Tier 1 (6.0% avg rate)',
            potentialRebateValue: '$0',
            potentialRebateSubtitle: 'Could be $95K if Tier 1 achieved'
        },
        'kaiser': {
            currentQuarterPurchases: '$3.125M',
            currentQuarterSubtitle: 'Q2 CY25 (as of 5/26/25) • 93% of Tier 1',
            currentQuarterTrend: '+15.7%',
            projectedQuarterEnd: '$3.580M',
            projectedQuarterSubtitle: 'Based on current run rate (107% of Tier 1)',
            rebateEligibilityStatus: 'Tier 1 Eligible',
            rebateEligibilitySubtitle: 'Exceeding Tier 1 threshold (5.0% avg rate)',
            potentialRebateValue: '$179K',
            potentialRebateSubtitle: 'Could be $262K if Tier 2 achieved'
        },
        'intermountain': {
            currentQuarterPurchases: '$625K',
            currentQuarterSubtitle: 'Q2 CY25 (as of 5/26/25) • 19% of Tier 1',
            currentQuarterTrend: '+3.1%',
            projectedQuarterEnd: '$1.045M',
            projectedQuarterSubtitle: 'Based on current run rate (31% of Tier 1)',
            rebateEligibilityStatus: 'Not Eligible',
            rebateEligibilitySubtitle: 'Need $2.305M more for Tier 1 (3.0% avg rate)',
            potentialRebateValue: '$0',
            potentialRebateSubtitle: 'Could be $78K if Tier 1 achieved'
        }
    };
    
    const selectedData = kpiData[accountKey] || kpiData['banner'];
    
    // Update KPI elements
    const kpiElements = {
        currentQuarterPurchases: document.getElementById('currentQuarterPurchases'),
        currentQuarterSubtitle: document.getElementById('currentQuarterSubtitle'),
        currentQuarterTrend: document.getElementById('currentQuarterTrend'),
        projectedQuarterEnd: document.getElementById('projectedQuarterEnd'),
        projectedQuarterSubtitle: document.getElementById('projectedQuarterSubtitle'),
        rebateEligibilityStatus: document.getElementById('rebateEligibilityStatus'),
        rebateEligibilitySubtitle: document.getElementById('rebateEligibilitySubtitle'),
        potentialRebateValue: document.getElementById('potentialRebateValue'),
        potentialRebateSubtitle: document.getElementById('potentialRebateSubtitle')
    };
    
    // Update each KPI element if it exists
    Object.keys(kpiElements).forEach(key => {
        if (kpiElements[key]) {
            kpiElements[key].textContent = selectedData[key];
        }
    });
    
    // Update KPI card colors based on eligibility status
    const rebateCard = document.querySelector('.kpi-card.amber');
    const projectedCard = document.querySelector('.kpi-card.green');
    
    if (selectedData.rebateEligibilityStatus.includes('Eligible')) {
        if (rebateCard) {
            rebateCard.classList.remove('amber');
            rebateCard.classList.add('green');
        }
    } else {
        if (rebateCard) {
            rebateCard.classList.remove('green');
            rebateCard.classList.add('amber');
        }
    }
}

/**
 * Show account change success notification
 */
function showAccountChangeSuccess(accountKey) {
    const accountNames = {
        'banner': 'Banner Health',
        'mayo': 'Mayo Clinic',
        'cleveland': 'Cleveland Clinic',
        'kaiser': 'Kaiser Permanente',
        'intermountain': 'Intermountain Healthcare'
    };
    
    const accountName = accountNames[accountKey] || 'Enterprise Account';
    
    const banner = document.querySelector('.banner-text');
    if (banner) {
        const originalText = banner.textContent;
        banner.textContent = `✓ Switched to ${accountName} - All KPIs and tier opportunities updated`;
        banner.style.color = '#065f46';
        
        setTimeout(() => {
            banner.textContent = originalText;
            banner.style.color = '';
        }, 4000);
    }
}

// Export functions for potential external use
window.DashboardApp = {
    updateKPIValues,
    refreshData,
    trackTabView,
    generateRandomKPIValue,
    // Rebate-specific exports
    updateRebateCalculations,
    projectRebate,
    formatCurrency,
    REBATE_CONFIG,
    // Forecast-specific exports
    updateForecastCalculations,
    getCurrentProductMix,
    calculateRebateFromForecast
};

