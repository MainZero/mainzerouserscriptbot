// ==UserScript==
// @name         @MAINZYGG OFFICIAL BOT ESball.ph Auto-Filler
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Auto-fill ESball.ph registration form with specific patterns
// @author       You
// @match        https://www.esball.ph/register?r=jym2362*
// @match        https://www.esball.ph/m/home*
// @match        https://www.esball.ph/m/myAccount/index*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    // Configuration - Customize these arrays if needed
    const config = {
        password: 'Mainzy25', // Fixed password as requested
        firstNames: ['Leah', 'Sarah', 'Anna', 'Emma', 'Mia', 'Luna', 'Chloe', 'Zoe', 'Ruby', 'Ella'],
        lastNames: ['Durban', 'Smith', 'Johnson', 'Brown', 'Davis', 'Wilson', 'Taylor', 'Clark', 'Lewis', 'Lee'],
        numberRange: [10, 99], // Random numbers will be between 10-99
        emailDomains: ['@yahoo1.com', '@gmail1.com', '@hotmail1.com', '@outlook1.com', '@mail1.com'],
        viberLength: { min: 6, max: 10 }
    };

    // Store username for account page
    let generatedUsername = '';
    let isScriptActive = true; // Control flag for start/stop
    let currentTimeout = null; // To track timeouts for cancellation

    function generateUsername() {
        const firstName = config.firstNames[Math.floor(Math.random() * config.firstNames.length)];
        const randomNum = Math.floor(Math.random() * (config.numberRange[1] - config.numberRange[0] + 1)) + config.numberRange[0];
        return firstName + randomNum;
    }

    function generateRealName(username) {
        // Extract the name part from username (remove numbers)
        const namePart = username.replace(/\d+/g, '');
        const lastName = config.lastNames[Math.floor(Math.random() * config.lastNames.length)];
        return namePart + ' ' + lastName;
    }

    function generateEmail(username) {
        const domain = config.emailDomains[Math.floor(Math.random() * config.emailDomains.length)];
        return username + domain;
    }

    function generateViberNumber() {
        const length = Math.floor(Math.random() * (config.viberLength.max - config.viberLength.min + 1)) + config.viberLength.min;
        let viber = '';
        for (let i = 0; i < length; i++) {
            viber += Math.floor(Math.random() * 10);
        }
        return viber;
    }

    function clearAllTimeouts() {
        if (currentTimeout) {
            clearTimeout(currentTimeout);
            currentTimeout = null;
        }
    }

    function stopScript() {
        isScriptActive = false;
        clearAllTimeouts();
        console.log('⏹️ Script stopped manually');
        updateControlButtons();
    }

    function startScript() {
        isScriptActive = true;
        console.log('▶️ Script started manually');
        updateControlButtons();

        // Re-initialize based on current page
        if (window.location.href.includes('register')) {
            waitForForm();
        } else if (window.location.href.includes('/m/home')) {
            handleHomePage();
        } else if (window.location.href.includes('/m/myAccount/index')) {
            handleAccountPage();
        }
    }

    function toggleScript() {
        if (isScriptActive) {
            stopScript();
        } else {
            startScript();
        }
    }

    function fillESballForm() {
        if (!isScriptActive) return;

        console.log('🚀 Filling ESball registration form...');

        // Generate username first
        generatedUsername = generateUsername();
        const realName = generateRealName(generatedUsername);

        // Store username for account page
        GM_setValue('esball_username', generatedUsername);

        // Fill the specific fields using XPath patterns
        fillFieldByXPath('//input[@placeholder="Username"][@name="username"]', generatedUsername);
        fillFieldByXPath('//input[@name="password"][@placeholder="Password"]', config.password);
        fillFieldByXPath('//input[@name="checkPass"][@placeholder="Confirm password"]', config.password);
        fillFieldByXPath('//input[@name="payeeName"][@placeholder="Real name"]', realName);

        console.log('✅ Form filled successfully!');
        console.log('📋 Generated data:');
        console.log('   Username:', generatedUsername);
        console.log('   Password:', config.password);
        console.log('   Real Name:', realName);
    }

    function handleHomePage() {
        if (!isScriptActive) return;

        console.log('🏠 Home page detected, redirecting to account page...');

        // Create status message
        createStatusMessage('🔄 Redirecting to account page in 2 seconds...', '#e67e22');

        // Redirect to account page after 2 seconds
        currentTimeout = setTimeout(() => {
            if (isScriptActive) {
                window.location.href = 'https://www.esball.ph/m/myAccount/index?r=jym2362';
            }
        }, 2000);
    }

    function handleAccountPage() {
        if (!isScriptActive) return;

        console.log('📊 Account page detected, filling details...');

        // Get stored username or generate new one
        const username = GM_getValue('esball_username', generateUsername());
        const email = generateEmail(username);
        const viber = generateViberNumber();

        console.log('📋 Account details:');
        console.log('   Username:', username);
        console.log('   Email:', email);
        console.log('   Viber:', viber);

        // Fill account fields after a short delay
        currentTimeout = setTimeout(() => {
            if (!isScriptActive) return;

            // Fill email field
            const emailField = findInputByAttributes('email', 'Please enter your email');
            if (emailField) {
                emailField.value = email;
                triggerEvents(emailField);
                console.log('✅ Email field filled');
            }

            // Fill Viber field
            const viberField = findInputByAttributes('viber', 'Viber');
            if (viberField) {
                viberField.value = viber;
                triggerEvents(viberField);
                console.log('✅ Viber field filled');
            }

            // Click submit button after filling
            currentTimeout = setTimeout(() => {
                if (isScriptActive) {
                    clickSubmitButton();
                }
            }, 500);
        }, 1500);
    }

    function findInputByAttributes(name, placeholder) {
        const xpath = `//input[@name="${name}"][contains(@placeholder, "${placeholder}")]`;
        try {
            const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            return result.singleNodeValue;
        } catch (error) {
            console.error('XPath error:', error);
            return null;
        }
    }

    function clickSubmitButton() {
        if (!isScriptActive) return;

        console.log('🖱️ Looking for submit button...');

        // Try to find the submit button
        const buttonXpath = "//a[contains(@class, 'btn-success') and contains(@class, 'am-button')]";
        try {
            const button = document.evaluate(buttonXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (button && button.textContent.includes('Submit')) {
                console.log('✅ Clicking submit button...');
                button.click();
                // Stop script after successful submission
                stopScript();
                return true;
            }
        } catch (error) {
            console.error('Error finding submit button:', error);
        }

        console.log('❌ Submit button not found');
        return false;
    }

    function fillFieldByXPath(xpath, value) {
        try {
            const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            if (result.singleNodeValue) {
                const field = result.singleNodeValue;
                field.value = value;

                // Trigger necessary events
                field.dispatchEvent(new Event('input', { bubbles: true }));
                field.dispatchEvent(new Event('change', { bubbles: true }));
                field.dispatchEvent(new Event('blur', { bubbles: true }));

                return true;
            }
            return false;
        } catch (error) {
            console.error('Error with XPath:', xpath, error);
            return false;
        }
    }

    function triggerEvents(element) {
        ['input', 'change', 'blur'].forEach(eventType => {
            element.dispatchEvent(new Event(eventType, { bubbles: true }));
        });
    }

    function createStatusMessage(text, color) {
        const status = document.createElement('div');
        status.textContent = text;
        status.style.cssText = `
            position: fixed;
            top: 70px;
            right: 20px;
            background: ${color};
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            font-family: Arial, sans-serif;
            font-size: 12px;
            z-index: 9998;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        `;
        document.body.appendChild(status);

        // Remove after 3 seconds
        setTimeout(() => {
            if (status.parentNode) {
                status.parentNode.removeChild(status);
            }
        }, 3000);
    }

    function updateControlButtons() {
        const toggleBtn = document.getElementById('esball-toggle-btn');
        const autoFillBtn = document.getElementById('esball-auto-fill-btn');

        if (toggleBtn) {
            toggleBtn.textContent = isScriptActive ? '⏹️ Stop Script' : '▶️ Start Script';
            toggleBtn.style.background = isScriptActive ?
                'linear-gradient(45deg, #FF6B6B, #C0392B)' :
                'linear-gradient(45deg, #4ECDC4, #27ae60)';
        }

        if (autoFillBtn) {
            autoFillBtn.style.opacity = isScriptActive ? '1' : '0.5';
            autoFillBtn.style.cursor = isScriptActive ? 'pointer' : 'not-allowed';
        }
    }

    function createControlButtons() {
        // Remove existing buttons if any
        const oldToggle = document.getElementById('esball-toggle-btn');
        const oldFill = document.getElementById('esball-auto-fill-btn');
        if (oldToggle) oldToggle.remove();
        if (oldFill) oldFill.remove();

        // Create toggle button
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'esball-toggle-btn';
        toggleBtn.textContent = isScriptActive ? '⏹️ Stop Script' : '▶️ Start Script';
        toggleBtn.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #FF6B6B, #C0392B);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 25px;
            font-weight: bold;
            cursor: pointer;
            z-index: 10000;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            font-family: Arial, sans-serif;
            transition: all 0.3s ease;
        `;

        // Create auto-fill button
        const autoFillBtn = document.createElement('button');
        autoFillBtn.id = 'esball-auto-fill-btn';
        autoFillBtn.textContent = window.location.href.includes('register') ?
            '🎯 Auto-Fill Form' : '📧 Fill Account Details';
        autoFillBtn.style.cssText = `
            position: fixed;
            top: 70px;
            right: 20px;
            background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 25px;
            font-weight: bold;
            cursor: pointer;
            z-index: 9999;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            font-family: Arial, sans-serif;
            transition: all 0.3s ease;
        `;

        // Add event listeners
        toggleBtn.addEventListener('click', toggleScript);
        autoFillBtn.addEventListener('click', () => {
            if (isScriptActive) {
                if (window.location.href.includes('register')) {
                    fillESballForm();
                } else if (window.location.href.includes('myAccount')) {
                    handleAccountPage();
                }
            }
        });

        // Add hover effects
        [toggleBtn, autoFillBtn].forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                if (isScriptActive || btn.id === 'esball-toggle-btn') {
                    btn.style.transform = 'translateY(-2px)';
                    btn.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
                }
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0)';
                btn.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
            });
        });

        // Add to document
        document.body.appendChild(toggleBtn);
        document.body.appendChild(autoFillBtn);

        // Update initial state
        updateControlButtons();
    }

    function waitForForm() {
        if (!isScriptActive) return;

        // Check if form fields are available
        const checkField = () => {
            try {
                const result = document.evaluate('//input[@placeholder="Username"][@name="username"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
                return result.singleNodeValue !== null;
            } catch (error) {
                return false;
            }
        };

        if (checkField()) {
            console.log('✅ Registration form detected');
            createControlButtons();

            // Optional: Auto-fill after a short delay
            currentTimeout = setTimeout(() => {
                if (isScriptActive) {
                    fillESballForm();
                }
            }, 1000);
        } else {
            // Retry every second until form is loaded
            currentTimeout = setTimeout(waitForForm, 1000);
        }
    }

    function init() {
        console.log('🎯 ESball Auto-Filler loaded for:', window.location.href);
        createControlButtons();

        if (window.location.href.includes('register')) {
            waitForForm();
        } else if (window.location.href.includes('/m/home')) {
            handleHomePage();
        } else if (window.location.href.includes('/m/myAccount/index')) {
            handleAccountPage();
        }
    }

    // Initialize when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Add keyboard shortcut (Alt + F for fill, Alt + S for stop/start)
    document.addEventListener('keydown', function(e) {
        if (e.altKey && e.key === 'f' && isScriptActive) {
            if (window.location.href.includes('register')) {
                fillESballForm();
            } else if (window.location.href.includes('myAccount')) {
                handleAccountPage();
            }
        }
        if (e.altKey && e.key === 's') {
            toggleScript();
        }
    });

    console.log('🎯 ESball Auto-Filler loaded!');
    console.log('📋 Controls:');
    console.log('   Alt+F - Fill form');
    console.log('   Alt+S - Toggle start/stop');
    console.log('   Buttons - Top-right corner');
})();