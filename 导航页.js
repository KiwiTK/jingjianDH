const config = {
    title: "我的导航",
    subtitle: "Kiwi's Navigation",
    logo_icon: "sitemap",
    hitokoto: false,
    search: true,
    search_engine: [
        {
            name: "百度",
            template: "https://www.baidu.com/s?wd=$s",
            logo: "https://raw.githubusercontent.com/KiwiTK/CF-Worker-Dir/refs/heads/master/PCtm_d9c8750bed0b3c7d089fa7d56cf.png"
        },
        {
            name: "谷歌",
            template: "https://www.google.com/search?q=$s",
            logo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
        },
        {
            name: "Bing",
            template: "https://www.bing.com/search?q=$s",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png"
        }
    ],
    lists: []
};

const el = (tag, attrs, content) => `<${tag} ${attrs.join(" ")}>${content}</${tag}>`;

async function handleRequest(request) {
    return new Response(renderHTML(renderIndex(), null), {
        headers: { 'content-type': 'text/html;charset=UTF-8' }
    });
}

addEventListener('fetch', event => event.respondWith(handleRequest(event.request)));

function getFavicon(url) {
    return `https://www.google.cn/s2/favicons?sz=64&domain_url=${url.match(/https?:\/\//) ? url : `http://${url}`}`;
}

function renderIndex() {
    return renderHeader();
}

function renderHeader() {
    const item = (template, name, logo) => el('a', ['class="item"', `data-url="${template}"`, `data-logo="${logo}"`], name);
    const logo = config.search_engine[0].logo;
    const logoContainer = el('div', ['id="logo-container"'], el('img', ['id="search-logo"', `src="${logo}"`, 'alt="搜索引擎 logo"', 'width="300"', 'height="100"'], ""));
    const menu = el('div', ['id="sengine"', 'class="menu"'], config.search_engine.map((link, key) => {
        const cls = key === 0 ? 'class="active item"' : 'class="item"';
        return el('a', [cls, `data-url="${link.template}"`, `data-logo="${link.logo}"`], link.name);
    }).join(""));
    const input = el('div', ['class="input-container"'], el('input', ['id="searchinput"', 'type="search"', 'placeholder=""', 'autocomplete="off"'], "") + el('button', ['class="search-button"'], "搜索"));
    return el('header', [], el('div', ['class="container"'], logoContainer + menu + input));
}

function renderHTML(index) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="Content-Security-Policy" content="img-src *;">
        <link rel="icon" href="https://www.baidu.com/favicon.ico" type="image/x-icon">
        <title>${config.title} - ${config.subtitle}</title>
        <style>
            body {
                background: #fff;
                color: #000;
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 200px 0 0;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .container {
                width: 600px;
                text-align: center;
            }
            #logo-container {
                margin-bottom: 20px;
                height: 100px;
            }
            #search-logo {
                width: 300px;
                height: 100px;
                object-fit: contain;
            }
            .menu {
                margin-bottom: 20px;
                display: flex;
                justify-content: center;
            }
            .item {
                margin: 0 15px;
                color: #000;
                text-decoration: none;
                font-size: 18px;
            }
            .item.active {
                font-weight: bold;
            }
            .input-container {
                display: flex;
                justify-content: center;
                margin-left: 30px;
            }
            #searchinput {
                width: 600px;
                padding: 12px;
                border: 1px solid #ccc;
                border-radius: 4px;
                margin: 0 10px;
                font-size: 16px;
                white-space: nowrap;
            }
            .search-button {
                padding: 12px 25px;
                background: #007BFF;
                color: #fff;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 16px;
                white-space: nowrap;
            }
            .search-button:hover {
                background: #0056b3;
            }
        </style>
    </head>
    <body>
        ${index}
        <script>
            const sengine = document.getElementById('sengine');
            const searchInput = document.getElementById('searchinput');
            const searchButton = document.querySelector('.search-button');
            const searchLogo = document.getElementById('search-logo');

            sengine.addEventListener('click', e => {
                if (e.target.classList.contains('item')) {
                    sengine.querySelector('.active').classList.remove('active');
                    e.target.classList.add('active');
                    searchLogo.src = e.target.dataset.logo;
                }
            });

            searchButton.addEventListener('click', () => {
                const activeItem = sengine.querySelector('.active');
                const url = activeItem.dataset.url.replace('$s', searchInput.value);
                window.location.href = url;
            });

            searchInput.addEventListener('keypress', e => {
                if (e.key === 'Enter') searchButton.click();
            });
        </script>
    </body>
    </html>`;
}