document.addEventListener('DOMContentLoaded', () => {
    // Header scroll effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const burgerBtn = document.getElementById('burger-menu');
    const closeBtn = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    burgerBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    const closeMenu = () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Language switcher
    const langLinks = document.querySelectorAll('.lang');
    langLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('.lang.active').classList.remove('active');
            e.target.classList.add('active');
        });
    });

    // Convert market/company chips into richer visual cards.
    const brandMap = {
        'exxonmobil corporation': { label: 'ExxonMobil', className: 'brand-exxon' },
        'exxon mobil corporation': { label: 'ExxonMobil', className: 'brand-exxon' },
        'shell plc': { label: 'Shell', className: 'brand-shell' },
        'shell': { label: 'Shell', className: 'brand-shell' },
        'bp plc': { label: 'bp', className: 'brand-bp' },
        'bp plc': { label: 'bp', className: 'brand-bp' },
        'bp': { label: 'bp', className: 'brand-bp' },
        'totalenergies se': { label: 'TotalEnergies', className: 'brand-total' },
        'totalenergies': { label: 'TotalEnergies', className: 'brand-total' },
        'chevron corporation': { label: 'Chevron', className: 'brand-chevron' },
        'petronas': { label: 'PETRONAS', className: 'brand-petronas' },
        'fuchs se': { label: 'FUCHS', className: 'brand-fuchs' },
        'fuchs petrolub se': { label: 'FUCHS', className: 'brand-fuchs' },
        'fuchs': { label: 'FUCHS', className: 'brand-fuchs' },
        'valvoline inc.': { label: 'Valvoline', className: 'brand-valvoline' },
        'lukoil': { label: 'LUKOIL', className: 'brand-lukoil' },
        'motul': { label: 'Motul', className: 'brand-motul' },
        'primary oil l.l.c.': { label: 'PRIMARY OIL', className: 'brand-primary' },
        'north sea lubricants': { label: 'North Sea', className: 'brand-northsea' },
        'axel americas llc': { label: 'AXEL', className: 'brand-axel' },
        's-oil corporation': { label: 'S-OIL', className: 'brand-soil' },
        'motiva enterprises llc': { label: 'Motiva', className: 'brand-motiva' },
        'sk enmove': { label: 'SK enmove', className: 'brand-sk' },
        'saudi aramco': { label: 'aramco', className: 'brand-aramco' },
        'eneos': { label: 'ENEOS', className: 'brand-eneos' },
        'shandong qingyuan group': { label: 'Qingyuan', className: 'brand-generic' },
        'hindustan petroleum': { label: 'HP', className: 'brand-hp' },
        'avista oil deutschland gmbh': { label: 'AVISTA', className: 'brand-avista' },
        'nynas ab': { label: 'Nynas', className: 'brand-nynas' },
        'repsol': { label: 'Repsol', className: 'brand-repsol' },
        'ergon, inc.': { label: 'Ergon', className: 'brand-ergon' },
        'calumet, inc.': { label: 'Calumet', className: 'brand-calumet' },
        'sinopec': { label: 'Sinopec', className: 'brand-sinopec' },
        'adnoc': { label: 'ADNOC', className: 'brand-adnoc' },
        'phillips 66 company': { label: 'Phillips 66', className: 'brand-phillips' },
        'orlen': { label: 'ORLEN', className: 'brand-orlen' },
        'gs caltex corporation': { label: 'GS Caltex', className: 'brand-gs' },
        'h&r group': { label: 'H&R', className: 'brand-hr' },
        'petrochina company': { label: 'PetroChina', className: 'brand-petrochina' },
        'pt pertamina': { label: 'Pertamina', className: 'brand-pertamina' },
        'baker hughes company': { label: 'Baker Hughes', className: 'brand-baker' },
        'veolia': { label: 'Veolia', className: 'brand-veolia' },
        'xylem inc.': { label: 'Xylem', className: 'brand-xylem' },
        'ecolab inc.': { label: 'Ecolab', className: 'brand-ecolab' },
        'thermax limited': { label: 'Thermax', className: 'brand-thermax' },
        'solenis': { label: 'Solenis', className: 'brand-solenis' },
        'pentair': { label: 'Pentair', className: 'brand-pentair' },
        'wog technologies': { label: 'WOG', className: 'brand-wog' },
        'golder associates': { label: 'Golder', className: 'brand-golder' },
        'swa water australia': { label: 'SWA', className: 'brand-swa' },
        'italmatch chemicals s.p.a': { label: 'Italmatch', className: 'brand-italmatch' },
        'the chemours company': { label: 'Chemours', className: 'brand-chemours' },
        'nye lubricants inc.': { label: 'Nye', className: 'brand-nye' },
        'eastman chemical company': { label: 'Eastman', className: 'brand-eastman' },
        'park electrochemical corp': { label: 'Park', className: 'brand-park' },
        'zodiac aerospace': { label: 'Zodiac', className: 'brand-zodiac' }
    };

    const normalizeName = (name) => name.toLowerCase().replace(/\s+/g, ' ').trim();

    const getBrand = (name) => {
        const normalized = normalizeName(name);
        return brandMap[normalized] || {
            label: name.length > 16 ? name.split(/\s+/).slice(0, 2).join(' ') : name,
            className: 'brand-generic'
        };
    };

    const createMarketCard = (name, meta = '', highlighted = false) => {
        const brand = getBrand(name);
        const card = document.createElement('article');
        card.className = `market-card${highlighted ? ' market-card-highlight' : ''}`;

        const mark = document.createElement('div');
        mark.className = 'market-card-mark';
        mark.innerHTML = `<span class="brand-wordmark ${brand.className}">${brand.label}</span>`;

        const body = document.createElement('div');
        body.className = 'market-card-body';
        body.innerHTML = `<strong>${name}</strong>${meta ? `<span>${meta}</span>` : ''}`;

        card.append(mark, body);
        return card;
    };

    document.querySelectorAll('.market-card').forEach(card => {
        const name = card.querySelector('.market-card-body strong')?.textContent.trim();
        const meta = card.querySelector('.market-card-body span')?.textContent.trim() || '';
        if (!name) return;
        card.replaceWith(createMarketCard(name, meta, card.classList.contains('market-card-highlight')));
    });

    document.querySelectorAll('.chips-grid').forEach(grid => {
        const heading = grid.previousElementSibling;
        const headingText = heading?.tagName === 'H4' ? heading.textContent.toLowerCase() : '';
        const shouldUseCards = headingText.includes('компан') || headingText.includes('бренд');

        if (!shouldUseCards) return;

        const nextGrid = document.createElement('div');
        nextGrid.className = 'market-card-grid';

        grid.querySelectorAll('.company-chip').forEach(chip => {
            const metaNode = chip.querySelector('small');
            const meta = metaNode?.textContent.trim() || '';
            if (metaNode) metaNode.remove();
            const name = chip.textContent.trim();
            if (name) nextGrid.appendChild(createMarketCard(name, meta, chip.classList.contains('highlight')));
        });

        grid.replaceWith(nextGrid);
    });

    // Tabs functionality for Market Niches
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and panels
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Show corresponding panel
            const targetId = btn.getAttribute('data-tab');
            document.getElementById(targetId).classList.add('active');
        });
    });
});
