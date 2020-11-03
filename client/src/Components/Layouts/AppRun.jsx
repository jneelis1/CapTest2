// import React from 'react'
// import { makeStyles } from '@material-ui/core/styles'
// import Button from '@material-ui/core/Button'

// const useStyles = makeStyles({
//     runAlign: {
//       textAlign: 'center',
//       marginBottom: "10px",
//       paddingTop: "100px"
      
//     },
//     table: {
//         minWidth: 650,
//     },
//     picture: {
//         width: "90%",
//         height: "90%",
//         alignContent: "center",
//         alignItems: 'center',
//         textAlign: 'center',
//     },
//     runPara: {
//         paddingBottom: "50px",
        
//     },
//     plus: {
//         border: "2px solid RoyalBlue",
//         borderRadius: "12px",
//         color: "RoyalBlue"
//     },
//     start: {
//         backgroundColor: "RoyalBlue",
//         radius: "12px",
//         color: "white"
//     }

//   })


//   function AppRun() {
//     const classes = useStyles();
//     return (
//       <React.Fragment>
        
        
//         <div className={classes.runAlign}>
//             <p className={classes.runPara}>
//                 <span>How often to run (minutes):  </span>
//                 <input type="text" placeholder="45" />
//             </p>
//             <p className={classes.runPara}>
//                 <span>Websites to search (URL):  </span>
//                 <input type="text" placeholder="msu.edu/about" />
//                 <Button variant="outline-primary" size="sm" className={classes.plus}>
//                 +
//                 </Button>{' '}
//             </p>
//             <p className={classes.runPara}>
//                 <span>Words to search for:  </span>
//                 <input type="text" placeholder="University" />
//                 <Button variant="outline-primary" size="sm" className={classes.plus}>
//                 +
//                 </Button>{' '}
//             </p>

//             <Button variant="primary" size="sm" className={classes.start}>
//                 Run Scraper
//                 </Button>{' '}

//         </div>
//       </React.Fragment>
//     )
//   }
  
//   export default AppRun
  