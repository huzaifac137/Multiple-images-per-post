import { stringify } from 'querystring';
import React , {useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {

    const controller = new AbortController();
    const signal = controller.signal;

    const navigate = useNavigate();

    const[PRODUCTS , setProducts] =
     useState<{file : Array<String> ,  _id : string , title : string , price:number , description : string}[]>([]);

    const[responseMessage , setResponseMessage] = useState<string| null>(null);
    const[isLoading , setIsLoading] = useState<boolean>(false);
    const[skip , setSkip] = useState<number>(0);
    const[isEnd , setEnd] = useState<string| null>(null);
    const[loadingFiles , setLoadingFiles] = useState<boolean>(false);

     const getPics=async()=>{

        let responseData : any;
        try
        {
          setIsLoading(true);
          setLoadingFiles(true);
           const response : Response = await fetch(`http://localhost:5000/api/files?skip=${skip}` , /*{signal :signal} */);

           responseData = await response.json();

           if(response.status!==200)
           {
            throw new Error(responseData.message);
           }

           setProducts((prev)=>{
              return [...prev , ...responseData.files];
           });
           
           setLoadingFiles(false);

           // TO DETECT ENDING FILE
           if(responseData.files?.length===0)
           {
            setEnd("Youre up to date...")
           }
            
           setIsLoading(false);
        }

        catch(err)
        {
           if(err instanceof Error)
           {
              setResponseMessage(err.message);
              setIsLoading(false);
              setLoadingFiles(false);
           }
        }
     };


     useEffect(()=>{
          getPics();

        /*  return()=>{
             controller.abort();
          }  */
     },[skip]);

     const handleScroll=(e:React.UIEvent<HTMLElement>)=>
     {
        
      const{scrollTop , offsetHeight , scrollHeight} = e.target as HTMLElement;

       if(offsetHeight+scrollTop>=scrollHeight)
        {
         setSkip(PRODUCTS?.length);
        }
     };


     const handleOpen=(pics : Array<String> , title : string , price: number , description:string)=>
     {
         navigate("/details" , {state: {pics : pics , title : title , price:price , description : description }})
     };


    return (

        <div className='homeContainer' onScroll={handleScroll} >
   
                {isLoading===true ? <h3>Please wait.......</h3> : null}  
                 {(isLoading===false && PRODUCTS.length===0 ) ? <h2>NO PRODUCTS FOUND!</h2>: null }
                   {PRODUCTS.map((item)=> (item) && <div className='previewimgContainer' key={item._id} 
                   onClick={()=>handleOpen(item.file , item.title , item.price , item.description)}>

                      <img  className="previewimg"
                    src={`${process.env.REACT_APP_SERVER_URL}/${item?.file[0]}`}  alt=""  />  
                    <h2>{item.title}</h2>
                     <h3 style={{color:"green"}}> ${item.price}</h3>
                    </div>
                    )}
                    {loadingFiles && <h3>Loading files.....</h3>}
                    {isEnd && <h3>{isEnd}</h3>}
        </div>  
    );
}

export default Home;