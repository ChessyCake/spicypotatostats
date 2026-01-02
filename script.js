window.onload = spicyPotatoStats;


let HarshStreak = 1;
let RaunakStreak = 1;
let PrathamStreak = 1;
let PrahladStreak = 1;


async function spicyPotatoStats() {
  const loader = document.getElementById("loader");
  const container = document.querySelector(".container");
  const footer = document.querySelector("footer");

  loader.style.visibility = "visible";
  container.style.visibility = "hidden";
  footer.style.visibility = "hidden";

  try {
    await fetchInfoAll();

    await fetchStreak();
    
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




async function fetchInfoAll() {
   const info = await fetch("https://codeforces.com/api/user.info?handles=vorqX;rust7;sn0w07;prahlad_kumar-0037");
         const data = await info.json();
         
         const dataArr = data.result;
         const harshData = dataArr[0];
         const raunakData = dataArr[1];
         const prathamData = dataArr[2];
         const prahladData = dataArr[3];
         
        document.getElementById("HarshuserName").innerHTML = `<p> ${harshData.handle} </p>`
        document.getElementById("RaunakuserName").innerHTML = `<p> ${raunakData.handle} </p>`
        document.getElementById("PrathamuserName").innerHTML = `<p> ${prathamData.handle} </p>`
        document.getElementById("PrahladuserName").innerHTML = `<p> ${prahladData.handle} </p>`
         
        document.getElementById("Harshrating").innerHTML = `<p> ${harshData.rating} </p>`
        document.getElementById("Raunakrating").innerHTML = `<p> ${raunakData.rating} </p>`
        document.getElementById("Prathamrating").innerHTML = `<p> ${prathamData.rating} </p>`
        document.getElementById("Prahladrating").innerHTML = `<p> ${prahladData.rating} </p>`

        document.getElementById("Harshpfp").style.backgroundImage = `url(${harshData.avatar})`
        document.getElementById("Raunakpfp").style.backgroundImage = `url(${raunakData.avatar})`
        document.getElementById("Prathampfp").style.backgroundImage = `url(${prathamData.avatar})`
        document.getElementById("Prahladpfp").style.backgroundImage = `url(${prahladData.avatar})`


        const HarshlastOnline = new Date(harshData.lastOnlineTimeSeconds * 1000).toLocaleString("en-IN", {
                   dateStyle: "medium",
                   timeStyle: "short",
                   timeZone: "Asia/Kolkata"
                })
         
        const RaunaklastOnline = new Date(raunakData.lastOnlineTimeSeconds * 1000).toLocaleString("en-IN", {
                   dateStyle: "medium",
                   timeStyle: "short",
                   timeZone: "Asia/Kolkata"
                })
        
        const PrathamlastOnline = new Date(prathamData.lastOnlineTimeSeconds * 1000).toLocaleString("en-IN", {
                   dateStyle: "medium",
                   timeStyle: "short",
                   timeZone: "Asia/Kolkata"
                })
        
        const PrahladlastOnline = new Date(prahladData.lastOnlineTimeSeconds * 1000).toLocaleString("en-IN", {
                   dateStyle: "medium",
                   timeStyle: "short",
                   timeZone: "Asia/Kolkata"
                })        
      
        document.getElementById("Harshlastonline").innerHTML = `<p> ${HarshlastOnline} </p>`
        document.getElementById("Raunaklastonline").innerHTML = `<p> ${RaunaklastOnline} </p>`
        document.getElementById("Prathamlastonline").innerHTML = `<p> ${PrathamlastOnline} </p>`
        document.getElementById("Prahladlastonline").innerHTML = `<p> ${PrahladlastOnline} </p>`

}


async function fetchStreak() {
  const STREAK_START = new Date("2026-01-01").setHours(0,0,0,0);
  const today = new Date();
  today.setHours(0,0,0,0);

  const harshstreak = await fetch(
    `https://codeforces.com/api/user.status?handle=vorqx&from=1&count=20`
  );
  const harshstreakData = await harshstreak.json();

  const harshstreakUpdate = harshstreakData.result;

  const harshsolvedDays = new Set();

  harshstreakUpdate.forEach((e) => {
    if (e.verdict === "OK") {
      const meo = new Date(e.creationTimeSeconds * 1000).setHours(0,0,0,0);
      harshsolvedDays.add(meo);
    }
  });

  const harsharray = Array.from(harshsolvedDays);
  harsharray.sort((a, b) => new Date(b) - new Date(a));

  const harshfilteredArray = harsharray.filter((d) => new Date(d) >= new Date(STREAK_START));

  if (harshfilteredArray.length === 0) {
       document.getElementById(`HarshStreak`).parentElement.style.display = "none";
       return;
   }

  if (harshfilteredArray.length === 1) {
      document.getElementById(`HarshStreak`).innerHTML = `<span>1</span>`;
      document.getElementById(`HarshStreak`).parentElement.style.display = "flex";
      return;
   }
     
     
     let harshLatestSolvedDate = new Date(harshfilteredArray[0]);
     let harshpreviousSolvedDate = new Date(harshfilteredArray[1]);

     harshLatestSolvedDate.setHours(0,0,0,0);
     harshpreviousSolvedDate.setHours(0,0,0,0);

     const harshgap = harshLatestSolvedDate - harshpreviousSolvedDate;
     const harshgapDays = Math.floor( harshgap/ (24*60*60*1000));
  

     if( harshgapDays > 1){
      document.getElementById(`HarshStreak`).parentElement.style.display = "none";
     } else {
         if( today.getTime() === harshLatestSolvedDate.getTime() ){
            HarshStreak++;
            document.getElementById(`HarshStreak`).innerHTML = `<span>${HarshStreak}</span>`;
            document.getElementById(`HarshStreak`).parentElement.style.display = "flex";
          
         } else {
             document.getElementById(`HarshStreak`).parentElement.style.display = "none";
         }
    }


    const raunakstreak = await fetch(
    `https://codeforces.com/api/user.status?handle=rust7&from=1&count=20`
  );
  const raunakstreakData = await raunakstreak.json();

  const raunakstreakUpdate = raunakstreakData.result;

  const raunaksolvedDays = new Set();

  raunakstreakUpdate.forEach((e) => {
    if (e.verdict === "OK") {
      const meo = new Date(e.creationTimeSeconds * 1000).setHours(0,0,0,0);
      raunaksolvedDays.add(meo);
    }
  });

  const raunakarray = Array.from(raunaksolvedDays);
  raunakarray.sort((a, b) => new Date(b) - new Date(a));

  const raunakfilteredArray = raunakarray.filter((d) => new Date(d) >= new Date(STREAK_START));


  if (raunakfilteredArray.length === 0) {
       document.getElementById(`RaunakStreak`).parentElement.style.display = "none";
       return;
   }

  if (raunakfilteredArray.length === 1) {
      document.getElementById(`RaunakStreak`).innerHTML = `<span>1</span>`;
      document.getElementById(`RaunakStreak`).parentElement.style.display = "flex";
      return;
   }
     
     
     let raunakLatestSolvedDate = new Date(raunakfilteredArray[0]);
     let raunakpreviousSolvedDate = new Date(raunakfilteredArray[1]);

     raunakLatestSolvedDate.setHours(0,0,0,0);
     raunakpreviousSolvedDate.setHours(0,0,0,0);

     const raunakgap = raunakLatestSolvedDate - raunakpreviousSolvedDate;
     const raunakgapDays = Math.floor( raunakgap/ (24*60*60*1000));
  

     if( raunakgapDays > 1){
      document.getElementById(`RaunakStreak`).parentElement.style.display = "none";
     } else {
         if( today.getTime() === raunakLatestSolvedDate.getTime() ){
              RaunakStreak++;
            document.getElementById(`RaunakStreak`).innerHTML = `<span>${RaunakStreak}</span>`;
            document.getElementById(`RaunakStreak`).parentElement.style.display = "flex";
          
         } else {
             document.getElementById(`RaunakStreak`).parentElement.style.display = "none";
         }
    }



    const prathamDatastreak = await fetch(
    `https://codeforces.com/api/user.status?handle=sn0w07&from=1&count=20`
  );
  const prathamDatastreakData = await prathamDatastreak.json();

  const prathamDatastreakUpdate = prathamDatastreakData.result;

  const prathamDatasolvedDays = new Set();

  prathamDatastreakUpdate.forEach((e) => {
    if (e.verdict === "OK") {
      const meo = new Date(e.creationTimeSeconds * 1000).setHours(0,0,0,0);
      prathamDatasolvedDays.add(meo);
    }
  });

  const prathamDataarray = Array.from(prathamDatasolvedDays);
  prathamDataarray.sort((a, b) => new Date(b) - new Date(a));

  const prathamDatafilteredArray = prathamDataarray.filter((d) => new Date(d) >= new Date(STREAK_START));


  if (prathamDatafilteredArray.length === 0) {
       document.getElementById(`PrathamStreak`).parentElement.style.display = "none";
       return;
   }

  if (prathamDatafilteredArray.length === 1) {
      document.getElementById(`PrathamStreak`).innerHTML = `<span>1</span>`;
      document.getElementById(`PrathamStreak`).parentElement.style.display = "flex";
      return;
   }
     
     
     let prathamDataLatestSolvedDate = new Date(prathamDatafilteredArray[0]);
     let prathamDatapreviousSolvedDate = new Date(prathamDatafilteredArray[1]);

     prathamDataLatestSolvedDate.setHours(0,0,0,0);
     prathamDatapreviousSolvedDate.setHours(0,0,0,0);

     const prathamDatagap = prathamDataLatestSolvedDate - prathamDatapreviousSolvedDate;
     const prathamDatagapDays = Math.floor(prathamDatagap/ (24*60*60*1000));
  
       console.log(prathamDataLatestSolvedDate)


     if( prathamDatagapDays > 1){
      document.getElementById(`PrathamStreak`).parentElement.style.display = "none";
     } else {
         if( today.getTime() === prathamDataLatestSolvedDate.getTime() ){
              PrathamStreak++;
            document.getElementById(`PrathamStreak`).innerHTML = `<span>${PrathamStreak}</span>`;
            document.getElementById(`PrathamStreak`).parentElement.style.display = "flex";
          
         } else {
             document.getElementById(`PrathamStreak`).parentElement.style.display = "none";
         }
    }

    
     const prahladDatastreak = await fetch(
    `https://codeforces.com/api/user.status?handle=prahlad_kumar-0037&from=1&count=20`
  );
  const prahladDatastreakData = await prahladDatastreak.json();

  const prahladDatastreakUpdate = prahladDatastreakData.result;

  const prahladDatasolvedDays = new Set();

  prahladDatastreakUpdate.forEach((e) => {
    if (e.verdict === "OK") {
      const meo = new Date(e.creationTimeSeconds * 1000).setHours(0,0,0,0);
      prahladDatasolvedDays.add(meo);
    }
  });

  const prahladDataarray = Array.from(prahladDatasolvedDays);
  prahladDataarray.sort((a, b) => new Date(b) - new Date(a));

  const prahladDatafilteredArray = prahladDataarray.filter((d) => new Date(d) >= new Date(STREAK_START));


  if (prahladDatafilteredArray.length === 0) {
       document.getElementById(`PrahladStreak`).parentElement.style.display = "none";
       return;
   }

  if (prahladDatafilteredArray.length === 1) {
      document.getElementById(`PrahladStreak`).innerHTML = `<span>1</span>`;
      document.getElementById(`PrahladStreak`).parentElement.style.display = "flex";
      return;
   }
     
     
     let prahladDataLatestSolvedDate = new Date(prahladDatafilteredArray[0]);
     let prahladDatapreviousSolvedDate = new Date(prahladDatafilteredArray[1]);

     prahladDataLatestSolvedDate.setHours(0,0,0,0);
     prahladDatapreviousSolvedDate.setHours(0,0,0,0);

     const prahladDatagap = prahladDataLatestSolvedDate - prahladDatapreviousSolvedDate;
     const prahladDatagapDays = Math.floor(prahladDatagap/ (24*60*60*1000));
  

     if( prahladDatagapDays > 1){
      document.getElementById(`PrahladStreak`).parentElement.style.display = "none";
     } else {
         if( today.getTime() === prahladDataLatestSolvedDate.getTime() ){
              PrahladStreak++;
            document.getElementById(`PrahladStreak`).innerHTML = `<span>${PrahladStreak}</span>`;
            document.getElementById(`PrahladStreak`).parentElement.style.display = "flex";
          
         } else {
             document.getElementById(`PrahladStreak`).parentElement.style.display = "none";
         }
    }








}
