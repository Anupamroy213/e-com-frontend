// import React, { useEffect, useRef } from 'react';
// import './footer2style.css';

// export default function Footer2() {
//   const trackRef = useRef(null); // Create a ref to track the image container

//   useEffect(() => {
//     const track = trackRef.current; // Access the DOM element using the ref
//     console.log(track);

//     if (track) {
//       const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;
//       const handleOnUp = () => {
//         track.dataset.mouseDownAt = "0";  
//         track.dataset.prevPercentage = track.dataset.percentage;
//       };

//       const handleOnMove = e => {
//         console.log("handleOnmove called");
//         if (!track || !track.dataset) return;
//         if (track.dataset.mouseDownAt === "0") return;

//         const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
//           maxDelta = window.innerWidth / 2;

//         const percentage = (mouseDelta / maxDelta) * -100,
//           nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
//           nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

//         track.dataset.percentage = nextPercentage;

//         track.animate({
//           transform: `translate(${nextPercentage}%, -50%)`
//         }, { duration: 1200, fill: "forwards" });

//         for (const image of track.getElementsByClassName("image")) {
//           image.animate({
//             objectPosition: `${100 + nextPercentage}% center`
//           }, { duration: 1200, fill: "forwards" });
//         }
//       };

//       window.addEventListener('mousedown', handleOnDown);
//       window.addEventListener('mouseup', handleOnUp);
//       // window.addEventListener('mousemove', handleOnMove);

//       return () => {
//         window.removeEventListener('mousedown', handleOnDown);
//         window.removeEventListener('mouseup', handleOnUp);
//         // window.removeEventListener('mousemove', handleOnMove);
//       };
//     }
//   }, []);

//   return (
//     <div className='bud'>
//       <div id="image-track" ref={trackRef} data-mouse-down-at="0" data-prev-percentage="0">
//         {/* Your image elements here */}
//       </div>
//     </div>
//   );
// }
