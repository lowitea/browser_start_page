document.addEventListener("DOMContentLoaded", () => {
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
});
