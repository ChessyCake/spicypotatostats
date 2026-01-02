window.onload = spicyPotatoStats;

async function spicyPotatoStats() {
  const loader = document.getElementById("loader");
  const container = document.querySelector(".container");
  const footer = document.querySelector("footer");

  loader.style.visibility = "visible";
  container.style.visibility = "hidden";
  footer.style.visibility = "hidden";

  try {
    await Promise.all([
      fetchInfo("vorqx", "Harsh"),
      fetchInfo("rust7", "Raunak"),
      fetchInfo("sn0w07", "Pratham"),
      fetchInfo("prahlad_kumar-0037", "Prahlad"),
    ]);

    await Promise.all([
      fetchStreak("vorqx", "HarshStreak"),
      fetchStreak("rust7", "RaunakStreak"),
      fetchStreak("sn0w07", "PrathamStreak"),
      fetchStreak("prahlad_kumar-0037", "PrahladStreak"),
    ]);
  } catch (err) {
    loader.innerHTML = "Failed to load!";
  } finally {
    loader.style.visibility = "hidden";
    container.style.visibility = "visible";
    footer.style.visibility = "visible";
  }
}

const tem = document.getElementById("time");

setInterval(() => {
  const tim = new Date().toLocaleTimeString();
  tem.innerHTML = `<h1>Time: <span> ${tim} </span> <h1>`;
}, 1000);

async function fetchInfo(userName, specialId) {
  const info = await fetch(
    `https://codeforces.com/api/user.info?handles=${userName}`
  );
  const data = await info.json();

  const user = data.result[0];
  document.getElementById(
    `${specialId}userName`
  ).innerHTML = `<p> ${user.handle} </p>`;
  document.getElementById(
    `${specialId}rating`
  ).innerHTML = `<p> ${user.rating} </p>`;
  document.getElementById(
    `${specialId}pfp`
  ).style.backgroundImage = `url(${user.avatar})`;

  const lastOnline = new Date(user.lastOnlineTimeSeconds * 1000).toLocaleString(
    "en-IN",
    {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    }
  );

  document.getElementById(
    `${specialId}lastonline`
  ).innerHTML = `<p> ${lastOnline} </p>`;
}

async function fetchStreak(userName, specialId) {
  const STREAK_START = new Date("2026-01-01").toLocaleDateString();
  const today = new Date().toLocaleDateString();

  const streak = await fetch(
    `https://codeforces.com/api/user.status?handle=${userName}&from=1&count=500`
  );
  const streakData = await streak.json();

  const streakUpdate = streakData.result;

  let streakValue = 0;
  const solvedDays = new Set();

  streakUpdate.forEach((e) => {
    if (e.verdict === "OK") {
      const meo = new Date(e.creationTimeSeconds * 1000).toLocaleDateString();
      solvedDays.add(meo);
    }
  });

  const array = Array.from(solvedDays);
  array.sort((a, b) => new Date(b) - new Date(a));

  const filteredArray = array.filter(
    (d) => new Date(d) >= new Date(STREAK_START)
  );

  if (Date.parse(today) < Date.parse(STREAK_START)) {
    document.getElementById(specialId).parentElement.style.display = "none";
  } else if (filteredArray.length === 0) {
    document.getElementById(specialId).parentElement.style.display = "none";
  } else {
    const latest = new Date(filteredArray[0]);
    const now = new Date();

    latest.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    const diffDays = Math.floor((now - latest) / (24 * 60 * 60 * 1000));

    if (diffDays > 1) {
      document.getElementById(specialId).parentElement.style.display = "none";
    } else {
      streakValue = 1;

      for (let i = 0; i < filteredArray.length - 1; i++) {
        let d1 = new Date(filteredArray[i]);
        let d2 = new Date(filteredArray[i + 1]);

        d1.setHours(0, 0, 0, 0);
        d2.setHours(0, 0, 0, 0);

        let gap = Math.floor(Math.abs(d1 - d2) / (24 * 60 * 60 * 1000));

        if (gap === 1) {
          streakValue++;
        } else break;
      }

      document.getElementById(
        specialId
      ).innerHTML = `<span>${streakValue}</span>`;
      document.getElementById(specialId).parentElement.style.display = "flex";
    }
  }
}
