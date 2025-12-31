const arr = ["12/31/2025","12/30/2025"];

let gapTime = Math.abs(arr[0] - arr[1]);
    let gap = Math.floor( gapTime/(24*60*60*1000) );

    console.log(gap);