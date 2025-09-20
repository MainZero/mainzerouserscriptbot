// ==UserScript==
// @name         @MAINZYGG OFFICIAL BOT NOT 4 SALE ESball.ph Auto-Filler
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  Auto-fill ESball.ph registration form with specific patterns
// @author       You
// @match        https://www.esball.ph/m/register?r=jym2362*
// @match        https://www.esball.ph/m/home*
// @match        https://www.esball.ph/m/home?r=jym2362*
// @match        https://www.esball.ph/m/home?r=jym2362&gtagId=*
// @match        https://www.esball.ph/m/myAccount/index*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    // Configuration - 100+ different 6-letter names
    const config = {
        password: 'Mainzy25', // Fixed password as requested
        sixLetterNames: [
            'Sophia', 'Olivia', 'Emma', 'Ava', 'Isabella', 'Mia', 'Zoe', 'Lily', 'Emily', 'Chloe',
            'Layla', 'Madison', 'Grace', 'Zoey', 'Nora', 'Hannah', 'Lily', 'Avery', 'Ella', 'Scarlett',
            'Aria', 'Riley', 'Amelia', 'Nova', 'Addison', 'Luna', 'Brook', 'Bella', 'Lucy', 'Paisley',
            'Everly', 'Skylar', 'Ellie', 'Natalie', 'Leah', 'Hazel', 'Violet', 'Aurora', 'Savannah', 'Audrey',
            'Brooklyn', 'Bella', 'Claire', 'Anna', 'Kinsley', 'Allison', 'Samantha', 'Natalia', 'Sarah', 'Camila',
            'Genesis', 'Kennedy', 'Sadie', 'Aaliyah', 'Gabriel', 'Elena', 'Naomi', 'Alice', 'Sara', 'Ruby',
            'Emery', 'Lydia', 'Clara', 'Vivian', 'Reagan', 'Mackenzie', 'Madelyn', 'Katherine', 'Kaylee', 'Sophie',
            'Alexis', 'Haley', 'Taylor', 'Ashley', 'Brianna', 'Charlotte', 'Rebecca', 'Teagan', 'Dakota', 'Maya',
            'Melanie', 'Gianna', 'Alexa', 'Kylie', 'Cora', 'Julia', 'Kaitlyn', 'Faith', 'Alexandra', 'Jasmine',
            'Ariana', 'Isabelle', 'Morgan', 'Eva', 'Kimberly', 'Lauren', 'Bailey', 'Jennifer', 'Makayla', 'Lilly',
            'Jenna', 'Destiny', 'Amy', 'Paige', 'Maria', 'Brooke', 'Mckenzie', 'Nicole', 'Trinity', 'Kendall'
        ],
        lastNames: ['Durban', 'Smith', 'Johnson', 'Brown', 'Davis', 'Wilson', 'Taylor', 'Clark', 'Lewis', 'Lee'],
        emailDomains: ['@yahoo1.com', '@gmail1.com', '@hotmail1.com', '@outlook1.com', '@mail1.com'],
        viberLength: { min: 6, max: 10 }
    };

    // Store username for account page
    let generatedUsername = '';
    let isScriptActive = true; // Control flag for start/stop
    let currentTimeout = null; // To track timeouts for cancellation

    function generateUsername() {
        const firstName = config.sixLetterNames[Math.floor(Math.random() * config.sixLetterNames.length)];
        const randomDigits = Math.floor(Math.random() * 90 + 10); // 10-99 (always 2 digits)
        return firstName + randomDigits;
    }

    function generateRealName(username) {
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

        if (window.location.href.includes('register')) {
            waitForForm();
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
        generatedUsername = generateUsername();
        const realName = generateRealName(generatedUsername);
        GM_setValue('esball_username', generatedUsername);

        console.log('📋 Generated data:', { Username: generatedUsername, Password: config.password, RealName: realName });
        fillAllFields(generatedUsername, config.password, realName);
    }

    function fillAllFields(username, password, realName) {
        fillFieldsByXPath(username, password, realName);
        setTimeout(() => fillFieldsByDOM(username, password, realName), 500);
    }

    function fillFieldsByXPath(username, password, realName) {
        fillFieldByXPath('//input[@name="username"]', username);
        fillFieldByXPath('//input[@placeholder="Username"]', username);
        fillFieldByXPath('//input[@name="password"]', password);
        fillFieldByXPath('//input[@placeholder="Password"]', password);
        fillFieldByXPath('//input[@name="checkPass"]', password);
        fillFieldByXPath('//input[@name="confirmPassword"]', password);
        fillFieldByXPath('//input[@name="password_confirmation"]', password);
        fillFieldByXPath('//input[@placeholder="Confirm password"]', password);
        fillFieldByXPath('//input[@placeholder="Confirm Password"]', password);
        fillFieldByXPath('//input[@name="payeeName"]', realName);
        fillFieldByXPath('//input[@placeholder="Real name"]', realName);
        fillFieldByXPath('//input[@placeholder="Real Name"]', realName);
    }

    function fillFieldsByDOM(username, password, realName) {
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            const name = input.name.toLowerCase();
            const placeholder = (input.placeholder || '').toLowerCase();
            const type = input.type;

            if (type === 'password') {
                input.value = password;
                triggerEvents(input);
            } else if (name.includes('user') || placeholder.includes('user')) {
                input.value = username;
                triggerEvents(input);
            } else if (name.includes('check') || name.includes('confirm') || placeholder.includes('confirm') || placeholder.includes('check')) {
                input.value = password;
                triggerEvents(input);
            } else if (name.includes('payee') || name.includes('real') || placeholder.includes('real') || placeholder.includes('name')) {
                input.value = realName;
                triggerEvents(input);
            }
        });
    }

    function handleAccountPage() {
        if (!isScriptActive) return;

        console.log('📊 Account page detected, filling details...');
        const username = GM_getValue('esball_username', generateUsername());
        const email = generateEmail(username);
        const viber = generateViberNumber();

        console.log('📋 Account details:', { Username: username, Email: email, Viber: viber });

        currentTimeout = setTimeout(() => {
            if (!isScriptActive) return;

            const emailField = document.querySelector('input[name="email"]') ||
                              document.querySelector('input[placeholder*="email"]') ||
                              document.querySelector('input[placeholder*="Email"]');
            if (emailField) {
                emailField.value = email;
                triggerEvents(emailField);
                console.log('✅ Email field filled');
            }

            const viberField = document.querySelector('input[name="viber"]') ||
                               document.querySelector('input[placeholder*="viber"]') ||
                               document.querySelector('input[placeholder*="Viber"]');
            if (viberField) {
                viberField.value = viber;
                triggerEvents(viberField);
                console.log('✅ Viber field filled');
            }

            currentTimeout = setTimeout(() => {
                if (isScriptActive) {
                    clickSubmitButton();
                }
            }, 500);
        }, 1500);
    }

    function fillFieldByXPath(xpath, value) {
        try {
            const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            if (result.singleNodeValue) {
                result.singleNodeValue.value = value;
                triggerEvents(result.singleNodeValue);
                console.log(`✅ Filled field via XPath: ${xpath}`);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error with XPath:', xpath, error);
            return false;
        }
    }

    function clickSubmitButton() {
        if (!isScriptActive) return;

        const buttonSelectors = [
            "a.btn-success.am-button",
            "button[type='submit']",
            "input[type='submit']",
            "a[role='button']"
        ];

        for (const selector of buttonSelectors) {
            const buttons = document.querySelectorAll(selector);
            for (const button of buttons) {
                const buttonText = button.textContent.toLowerCase();
                if (buttonText.includes('submit') || button.type === 'submit') {
                    console.log('✅ Clicking submit button...');
                    button.click();
                    stopScript();
                    return true;
                }
            }
        }

        const buttonXpath = "//a[contains(@class, 'btn-success') and contains(@class, 'am-button')]";
        try {
            const button = document.evaluate(buttonXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (button) {
                console.log('✅ Clicking submit button via XPath...');
                button.click();
                stopScript();
                return true;
            }
        } catch (error) {
            console.error('XPath button error:', error);
        }

        console.log('❌ Submit button not found');
        return false;
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
        setTimeout(() => { if (status.parentNode) status.parentNode.removeChild(status); }, 3000);
    }

    function updateControlButtons() {
        const toggleBtn = document.getElementById('esball-toggle-btn');
        const autoFillBtn = document.getElementById('esball-auto-fill-btn');
        const bindEmailBtn = document.getElementById('esball-bind-email-btn');

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
        if (bindEmailBtn) {
            bindEmailBtn.style.opacity = isScriptActive ? '1' : '0.5';
            bindEmailBtn.style.cursor = isScriptActive ? 'pointer' : 'not-allowed';
        }
    }

    function createBindEmailButton() {
        // Remove existing button if it exists
        const oldBtn = document.getElementById('esball-bind-email-btn');
        if (oldBtn) oldBtn.remove();

        // Create new button
        const bindEmailBtn = document.createElement('button');
        bindEmailBtn.id = 'esball-bind-email-btn';
        bindEmailBtn.textContent = 'BIND EMAIL';
        bindEmailBtn.style.cssText = `
            position: fixed;
            top: 120px;
            right: 20px;
            background: linear-gradient(45deg, #3498db, #2980b9);
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

        // Add click event to redirect to account page
        bindEmailBtn.addEventListener('click', () => {
            if (isScriptActive) {
                window.location.href = 'https://www.esball.ph/m/myAccount/index';
            }
        });

        // Add hover effects
        bindEmailBtn.addEventListener('mouseenter', () => {
            if (isScriptActive) {
                bindEmailBtn.style.transform = 'translateY(-2px)';
                bindEmailBtn.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
            }
        });
        bindEmailBtn.addEventListener('mouseleave', () => {
            bindEmailBtn.style.transform = 'translateY(0)';
            bindEmailBtn.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
        });

        document.body.appendChild(bindEmailBtn);
        updateControlButtons();
    }

    function createControlButtons() {
        const oldToggle = document.getElementById('esball-toggle-btn');
        const oldFill = document.getElementById('esball-auto-fill-btn');
        if (oldToggle) oldToggle.remove();
        if (oldFill) oldFill.remove();

        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'esball-toggle-btn';
        toggleBtn.textContent = isScriptActive ? '⏹️ Stop Script' : '▶️ Start Script';
        toggleBtn.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${isScriptActive ? 'linear-gradient(45deg, #FF6B6B, #C0392B)' : 'linear-gradient(45deg, #4ECDC4, #27ae60)'};
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

        document.body.appendChild(toggleBtn);
        document.body.appendChild(autoFillBtn);

        // Create the BIND EMAIL button on all pages
        createBindEmailButton();

        updateControlButtons();
    }

    function waitForForm() {
        if (!isScriptActive) return;

        const checkField = () => document.querySelector('input[name="username"], input[placeholder*="Username"], input[placeholder*="username"]') !== null;

        if (checkField()) {
            console.log('✅ Registration form detected');
            createControlButtons();
            currentTimeout = setTimeout(() => { if (isScriptActive) fillESballForm(); }, 1000);
        } else {
            currentTimeout = setTimeout(waitForForm, 1000);
        }
    }

    function init() {
        console.log('🎯 ESball Auto-Filler loaded for:', window.location.href);
        createControlButtons();

        if (window.location.href.includes('register')) {
            waitForForm();
        } else if (window.location.href.includes('/m/myAccount/index')) {
            handleAccountPage();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    document.addEventListener('keydown', function(e) {
        if (e.altKey && e.key === 'f' && isScriptActive) {
            if (window.location.href.includes('register')) {
                fillESballForm();
            } else if (window.location.href.includes('myAccount')) {
                handleAccountPage();
            }
        }
        if (e.altKey && e.key === 's') toggleScript();
    });

    console.log('🎯 ESball Auto-Filler loaded!');
    console.log('📋 Controls: Alt+F - Fill form, Alt+S - Toggle start/stop');
    console.log('💡 Generating 6-letter names + 2-digit numbers (e.g., Sophia25, Olivia78)');
})();