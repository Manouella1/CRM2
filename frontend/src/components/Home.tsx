// import axios from "axios";
// import React, { useState, useEffect } from "react";

// function Home() {
//   const [heartVisible, setHeartVisible] = useState(false);
//   const [heartPosition, setHeartPosition] = useState({ x: 0, y: 0 });
//   const [dummyData, setDummyData] = useState(null);

//   const handleClick = (event) => {
//     const { clientX, clientY } = event;
//     setHeartPosition({ x: clientX, y: clientY });
//     setHeartVisible(true);

//     setTimeout(() => setHeartVisible(false), 1000);
//   };

//   const API_URL = "http://localhost:3000";

//   useEffect(() => {
//     axios.get(`${API_URL}/dummy`).then((response) => {
//       setDummyData(response.data);
//     });
//   }, []);

//   return (
//     <div className="flex items-center justify-center h-screen relative">
//       <h1
//         className="text-xl text-blue-900 font-bold hover:text-blue-400 cursor-pointer"
//         onClick={handleClick}
//       >
//         CRM System
//       </h1>
//       <div>{dummyData ? dummyData.getDummy : "Loading data..."}</div>
//       {heartVisible && (
//         <div
//           key={Math.random()}
//           className="absolute text-red-500 text-3xl animate-heart"
//           style={{ left: heartPosition.x, top: heartPosition.y }}
//         >
//           ❤️
//         </div>
//       )}
//     </div>
//   );
// }

// export default Home;
