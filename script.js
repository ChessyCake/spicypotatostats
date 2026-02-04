window.onload = loadAll;


const sleep = ms => new Promise(res => setTimeout(res, ms));

async function runAllStreaks() {
  const users = [
    { handle: "vorqx", el: "aStreak" },
    { handle: "rust7", el: "bStreak" },
    { handle: "sn0w07", el: "cStreak" },
    { handle: "famagusta-7", el: "dStreak" },
    { handle: "vreonx", el: "eStreak" }
    
  ];

  for (const user of users) {
    await streakCalculate(user.handle, user.el);
    await sleep(2000); 
  }
}




  async function streakCalculate(handle, streakElementId) {
  const START_DATE = new Date('2026-01-01').setHours(0,0,0,0);
  const todayMidnight = new Date().setHours(0,0,0,0);
  const ONE_DAY = 24 * 60 * 60 * 1000;

  const res = await fetch(
    `https://codeforces.com/api/user.status?handle=${handle}&from=1&count=1000`
  );
  const data = await res.json();

  const dateSet = new Set();

  data.result.forEach(e => {
    if (e.verdict === "OK") {
      const d = new Date(e.creationTimeSeconds * 1000)
        .setHours(0,0,0,0);
      dateSet.add(d);
    }
  });

  const days = [...dateSet].filter(d => d >= START_DATE).sort((a,b) => b - a);


  const lastSolved = days[0];
  const gapFromToday = todayMidnight - lastSolved;
  if (gapFromToday > ONE_DAY) {
      document.getElementById(streakElementId).parentElement.style.display = "none";
    return;
  }


  if (days.length === 0) {
  document.getElementById(streakElementId).parentElement.style.display = "none";
  return;
}
  let streak = 1;

  for (let i = 0; i < days.length - 1; i++) {
    if (days[i] - days[i+1] === ONE_DAY) streak++;
    else break;
  }

  console.log(streakElementId);
  console.log(streak);
  if( streak > 1){
  document.getElementById(streakElementId).innerHTML = `<span>${streak}</span>`;
  document.getElementById(streakElementId).parentElement.style.display = "flex";
  }
}
  
      async function loadAll() {
       
        const loader = document.getElementById("loader");
         const container = document.querySelector(".container");
        const footer = document.querySelector("footer");

         loader.style.visibility = "visible";
          container.style.visibility = "hidden";
      footer.style.visibility = "hidden";
        try{
       

      await runAllStreaks();


        await sleep(3000);

         await fetchUserInfo();
        
        } catch (err) {
          loader.innerHTML = "Failed to load!";
        } finally {
           loader.style.visibility = "hidden";
          container.style.visibility = "visible";
          footer.style.visibility = "visible";
           }

    }


const tem = document.getElementById("time");
function displayTime() {
 
    const currentTime = new Date();

    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();
    

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;

    document.getElementById('yo').textContent = timeString;
}
displayTime();
setInterval(displayTime, 1000);


async function getData() {
         const info = await fetch("https://codeforces.com/api/user.info?handles=vorqX;rust7;sn0w07;famagusta-7;vreonx");
         const data = await info.json();
         
         const dataArr = data.result;

         const retValue = [
          {handle: "a", Data: dataArr[0]},
          {handle: "b", Data: dataArr[1]},
          {handle: "c", Data: dataArr[2]},
          {handle: "d", Data: dataArr[3]},
          {handle: "e", Data: dataArr[4]}
         ]

         for( values of retValue){
                fetchUserInfo(values.handle, values.Data);
         }
}
 getData();



async function fetchUserInfo(handle, Data) {
  

         document.getElementById(`${handle}userName`).innerHTML = `<p> ${Data.handle}`;
         document.getElementById(`${handle}rating`).innerHTML = `<p> ${Data.rating}`;
         document.getElementById(`${handle}pfp`).style.background = `url(${Data.avatar})`;
         document.getElementById(`${handle}pfp`).style.backgroundSize = "cover";
         document.getElementById(`${handle}pfp`).style.backgroundPosition = "center";

         
        const lastOnline = new Date(Data.lastOnlineTimeSeconds * 1000).toLocaleString("en-IN", {
                   dateStyle: "medium",
                   timeStyle: "short",
                   timeZone: "Asia/Kolkata"
                })

         document.getElementById(`${handle}lastonline`).innerHTML = `<p> ${lastOnline} </p>`        
}




