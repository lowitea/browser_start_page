// Intercept and modify headers
browser.webRequest.onHeadersReceived.addListener(
  (details) => {
    const headers = details.responseHeaders.map((header) => {
      if (header.name.toLowerCase() === "access-control-allow-origin") {
        header.value = "*";
      }
      return header;
    });

    return { responseHeaders: headers };
  },
  { urls: ["<all_urls>"] },
  ["blocking", "responseHeaders"],
);

// Fetch the best favicon for a given URL
async function getBestFavicon(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch page");

    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");

    const iconLinks = Array.from(doc.querySelectorAll('link[rel*="icon"]'));
    let iconUrl = new URL("/favicon.ico", url).href;

    if (iconLinks.length > 0) {
      iconLinks.sort((a, b) => {
        const getSize = (link) => {
          const size = link.getAttribute("sizes");
          return size ? parseInt(size.split("x")[0], 10) : 0;
        };
        return getSize(b) - getSize(a);
      });
      iconUrl = new URL(iconLinks[0].getAttribute("href"), url).href;
    }

    return await downloadAndSaveFavicon(iconUrl, new URL(url).hostname);
  } catch (error) {
    console.error("Error fetching favicon:", error);
    return null;
  }
}

// Download and save the favicon
async function downloadAndSaveFavicon(iconUrl, hostname) {
  try {
    const response = await fetch(iconUrl);
    if (!response.ok) throw new Error("Failed to download favicon");

    const blob = await response.blob();
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        const base64data = reader.result;
        browser.storage.local
          .set({ [hostname]: base64data })
          .then(() => resolve(base64data))
          .catch(reject);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error saving favicon:", error);
    return null;
  }
}

// Initialize the document when it is ready
document.addEventListener("DOMContentLoaded", async () => {
  const backgrounds = [
    // "images/1.jpg",
    // "images/2.jpg",
    // "images/3.jpg",
    // "images/4.jpg",
    // "images/5.jpg",
    "images/6.jpg",
    // "images/7.jpg",
    // "images/8.jpg",
    // "images/9.jpg",
    // "images/10.jpg",
    // "images/11.jpg",
    // "images/12.jpg",
    // "images/13.jpg",
    // "images/14.jpg",
    // "images/15.jpg",
    // "images/16.jpg",
    // "images/17.jpg",
    // "images/18.jpg",
    // "images/19.jpg",
  ];

  const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
  document.body.style.cssText = `
      background: url(${randomBg}) no-repeat center center fixed;
      background-color: #000;
      background-size: cover;
    `;

  const pad = (num, size = 2) => String(num).padStart(size, "0");

  const updateClock = () => {
    const now = new Date();
    const elements = {
      mon: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ][now.getMonth()],
      d: now.getDate(),
      y: now.getFullYear(),
      h: pad(now.getHours()),
      m: pad(now.getMinutes()),
      s: pad(now.getSeconds()),
    };

    for (const [id, value] of Object.entries(elements)) {
      const element = document.getElementById(id);
      if (element) element.textContent = value;
    }
  };

  updateClock();
  setInterval(updateClock, 1000);

  let links = new Map();

  const addLinkOnPage = async (link) => {
    const linksContainer = document.getElementById("links");
    const linkElement = document.createElement("a");
    linkElement.href = link;
    linkElement.target = "_blank";
    linkElement.addEventListener("mousedown", (event) => {
      if (event.button === 2) {
        const confirmed = confirm("Delete?!\nEither OK or Cancel.");
        if (confirmed) {
          links.delete(event.target.parentNode.href);
          browser.storage.local.set({ links: links });
          linksContainer.removeChild(linkElement);
        }
      }
    });

    const favicon = document.createElement("img");
    let res = await browser.storage.local.get(link);
    let iconBlob = res[link];
    if (!iconBlob) {
      const iconLink = await getBestFavicon(link);
      await downloadAndSaveFavicon(iconLink, link);
      res = await browser.storage.local.get(link);
      iconBlob = res[link];
    }
    favicon.src = res[link];

    linkElement.appendChild(favicon);

    linksContainer.insertBefore(linkElement, linksContainer.firstChild);
  };

  browser.storage.local.get("links").then((res) => {
    links = res.links || links;
    for (const link_value of links.values()) {
      addLinkOnPage(link_value);
    }
  });

  const plusButton = document.getElementById("plus");
  plusButton.addEventListener("click", async () => {
    const link = window.prompt("add link", "defaultText");
    links.set(link, link);
    browser.storage.local.set({ links: links });
    await addLinkOnPage(link);
  });
});
