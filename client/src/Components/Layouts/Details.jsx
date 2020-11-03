import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
// import msu from '../../img/crackedImage.png'
// import cra from '../../img/Crack3.png'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import {getOne} from '../../services/webscraper.service'
import CameraAltIcon from '@material-ui/icons/CameraAlt';



const useStyles = makeStyles({
    gmHeader: {
      textAlign: 'center',
      marginBottom: "10px"
      
    },
    contain: {
        width: "75%"
    },
    table: {
        minWidth: 650,
    },
    picture: {
        width: "40%",
        height: "40%",
        alignContent: "center",
        alignItems: 'center',
        textAlign: 'center',
        display: 'inline-block',
        margin: '0 0.5em 0 0.5em',
    },
    textbox: {
        margin: "auto",
        width: "75%"
    },
    para: {
        fontSize: "24px"
    },
    hit: {
        backgroundColor: "yellow"
    },
    remove: {
        border: "2px solid Red",
        borderRadius: "12px",
        color: "Red",
        margin: "1em 0 1em 0",
        '&:hover':{
            backgroundColor: "#f2aeae",
        },

    },
    start: {
        backgroundColor: "Red",
        radius: "12px",
        color: "white",
        marginTop: "1em",
        '&:hover':{
            backgroundColor: "#801313",
        },

    },
    save: {
        backgroundColor: "Green",
        radius: "4px",
        color: "white",
        zIndex: "10",
        position: "fixed",
        top: "92%",
        right: "10px",
        padding: "15px 20px 15px 20px",
        fontSize: "24",
        '&:hover':{
            backgroundColor: "#124116",
        },

    },
    centering: {
        textAlign: 'center',
    },
    clickText: {
        boxShadow: 'none',
        border: 'none',
        background: "rgba(255, 255, 255, 0.0)",
        padding: "2px 1px 2px 0",
        fontSize: "16px",
        fontFamily: '"Arial", Gadget, sans-serif',

    }

  })

  const ueStyles = makeStyles(theme => ({
    screenshot: {
      textAlign: 'center',
      width: "100%",
        height: "auto",
        margin: "auto",
        
    }
  }));

  const styles = makeStyles(theme => ({
    detailTable: {
      textAlign: 'center',
        height: "auto",
        margin: "auto",
        marginTop: "1em",
        marginBottom: "1em",
    }
  }));

  const words = ["University", "MSU", "Michigan", "State", "University", "university", "universities", "student", "Student", "students", "Students"];
  const para = "MSU is a good University";
  const par = "About MSU MSU.edu About Michigan State University has been advancing the common good with uncommon will for more than 160 years. A top global university, MSU pushes the boundaries of discovery to make a better world while providing students with life-changing opportunities. TOP RANKINGS No. 32 Top public U.S. universities Gold Sustainability rating Top 100 Global university No. 1 Nuclear science graduate program MSU Facts Quick facts about MSU’s history, distinctions and campus community. Learn more People gather at Beaumont Tower People gather at Beaumont Tower Spartan Success Data about recent MSU graduates, including placement rates and salaries. MSU has a 93% placement rate for recent graduates, nearly 12% above the national average. Learn more Inclusion and Intercultural Initiatives MSU provides all Spartans with opportunities to reach their full academic and professional potential. Learn more Students standing arm in arm Experience MSU CAMPUS LIFE The MSU campus buzzes with ideas and energy, purpose and possibility created by Spartans. Join in. Read more Experience MSU VISIT MSU is one of the biggest, greenest campuses in the country, welcoming visitors from around the world. Read more MSU sign Board of Trustees Information about board members, meetings, decisions, bylaws and policies. Learn more"
  //const par = ""
  const parsed = par.split(" ");
  const newParsed = stripChars(parsed);

  function stripChars(p){
      let newList = [];
      for(let w of p){
          const pp = w.split(".");
          if(pp.length=== 1){
            newList.push(pp[0]);
          }
          else{
            newList.push(pp[0]);
            newList.push(pp[1]);
          }
      }
      return newList;
  } 


//   function readFile(subset){
//       let reader = new FileReader();
//       reader.onload = function(event){
//         console.log(event.target.result);
//       };
//       reader.readAsText(subset);
//   }

function ObjDetails(props) {
  const [editable, setEditable] = React.useState(false)
  const [content, setContent] = React.useState([])
  const [scrape, setScrape] = React.useState({})

  console.log(JSON.stringify(scrape))

  const { lookupId } = props
  function switchActive() {
    console.log(editable)
    setEditable(!editable)
    console.log('yes')
    console.log(editable)
    console.log(!editable)
  }
  const classes = useStyles()
  const clas = ueStyles()
  const tableAlign = styles()
  function tableFilling(x){
    if(editable === false){
        if (x === 0){
            return scrape.hits;
        }
        else{
            return scrape.score;
        }
    }
    else{
        if (x===0){
            return <input type="text" defaultValue={scrape.hits} />
        }
        else{
            return <input type="text" defaultValue={scrape.score} />
        }
    }
    }
    function screenshotFilling(){
        if(scrape.screenshot){
            return <img className={classes.picture} src={scrape.screenshot} alt="Screenshot collected from data" height={400} width={500} />
        }
        else{
            return (<div><CameraAltIcon fontSize="large" />
            </div>)
            
        }
    }

    function addButton(){
        if(scrape.screenshot){
            return (<Button disabled={(editable?false:true)} variant="primary" size="sm" className={classes.remove}>
                Remove Image
            </Button>)
        }
        else{
            return <p>Image not available</p>
        }
    }

    function editFilling(){
        if(editable === false){
            return "Edit";
        }
        else{
            return "Save";
        }
    }

  React.useEffect(() => {
    let response = {}
    const getScrape = (id) => {
      return getOne(id)
        .then(res => {
          response = res
          console.log(response)
          setScrape(response)
        })
        .catch(error => {
          console.log(error)
        })
    }
    if (lookupId !== null) {
      getScrape(lookupId)
    }
  }, [lookupId])

    function switchHighlight(event){
        console.log(event.target)
        console.log(classes.hit)
            if(event.target.classList.contains("makeStyles-hit-32")){
                event.target.classList.remove("makeStyles-hit-32")
            }
            else{
                event.target.classList.add("makeStyles-hit-32")
            }

    }

    let fileReader

    function parser(st){
        var str = st.substring(1, st.length-1);

        const parsed = str.split(",");
        /*const lst = parsed.map((vals) =>
        {if(words.includes(vals)){
            return <button onClick={switchHighlight} className={classes.clickText}><span className={classes.hit}>{vals} </span></button>
        }
        else{
            if(vals != " "){
                return <button onClick={switchHighlight} className={classes.clickText}><span>{vals} </span></button>
            }
        }
        }
        );*/
        return parsed
    }

    const handleFileRead = (e) => {
        const cont = fileReader.result;
        console.log(cont)
        let newCont = parser(cont)
        setContent(newCont)
        // … do something with the 'content' …
    };

    const handle = (file) => {
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file);
    };

    function makeString(text){
        let t = text.split(",")
        return t
    };

    let textfind = makeString(scrape.textfound)
    console.log(textfind)

    return (
      <React.Fragment>
        <div className={clas.screenshot}>
            <p>
            {screenshotFilling()} 
            </p>
            
            {addButton()}
            
        </div>
        <p className={tableAlign.detailTable}>
        <TableContainer component={Paper} >
            <Table
                className={classes.table}
                aria-label="Scrape Information"
            >
                <TableHead>
                <TableRow>
                    <TableCell align="center">URL</TableCell>
                    <TableCell align="center">Hits</TableCell>
                    <TableCell align="center">Score</TableCell>
                    <TableCell align="center">Date Found</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell align="center">{textfind}</TableCell>
                        <TableCell align="center">{tableFilling(0)}</TableCell>
                        <TableCell align="center">{tableFilling(1)}</TableCell>
                        <TableCell align="center">{scrape.datefound}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        <Button disabled={(editable?false:true)} variant="outline-primary" size="sm" className={classes.start}>
                Remove Entry
    </Button>{' '}
        </p>
        
        <div>
            <TableContainer>
            <Table
                className={classes.table}
                aria-label="Words Found"
            >

            </Table>
            </TableContainer>
        </div>
        <div>
            {scrape.text}
            {content}
        </div>
        <input type="file" name="inputfile"
            id="inputfile" accept='.txt'
            onChange={e => handle(e.target.files[0])}></input>
        <div>
            <p>About <span className={classes.hit}>MSU</span>
            <span className={classes.hit}>MSU</span>.edu  About
            <span className={classes.hit}>Michigan State University</span> has been advancing the common good with uncommon will for more than 160 years.

            A top global <span className={classes.hit}>university</span>, <span className={classes.hit}>MSU</span> pushes the boundaries of discovery to make a better world while providing students with life-changing opportunities.

            TOP RANKINGS

            No. 32
            Top public U.S. <span className={classes.hit}>universities</span>
            Gold
            Sustainability rating
            Top 100
            Global <span className={classes.hit}>university</span>
            No. 1
            Nuclear science graduate program
            <span className={classes.hit}>MSU</span> Facts

            Quick facts about <span className={classes.hit}>MSU</span>’s history, distinctions and campus community.

            Learn more
            People gather at Beaumont Tower
            People gather at Beaumont Tower
            Spartan Success

            Data about recent <span className={classes.hit}>MSU</span> graduates, including placement rates and salaries. <span className={classes.hit}>MSU</span> has a 93% placement rate for recent graduates, nearly 12% above the national average.

            Learn more
            Inclusion and Intercultural Initiatives

            <span className={classes.hit}>MSU</span> provides all Spartans with opportunities to reach their full academic and professional potential.

            Learn more
            Students standing arm in arm
            Experience <span className={classes.hit}>MSU</span>
            CAMPUS LIFE
            The <span className={classes.hit}>MSU</span> campus buzzes with ideas and energy, purpose and possibility created by Spartans. Join in.

            Read more
            Experience <span className={classes.hit}>MSU</span>
            VISIT
            <span className={classes.hit}>MSU</span> is one of the biggest, greenest campuses in the country, welcoming visitors from around the world.

            Read more
            <span className={classes.hit}>MSU</span> sign
            Board of Trustees

            Information about board members, meetings, decisions, bylaws and policies.

            Learn more
            </p>
            <p>
                {/* {subset} */}
            </p>
            <Button variant="primary" size="sm" className={classes.save} onClick={switchActive}>
                {editFilling()}
</Button>{' '}
        </div>
        
        
      </React.Fragment>
    )
  }
  
  export default ObjDetails
  