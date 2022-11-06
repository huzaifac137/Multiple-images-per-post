
import React , {useState} from 'react';

function FileUploader() {

     const[FILES , setFiles] = useState<FileList| null >(null);
     const[response , setResponse] = useState<string | null>(null);
     const[TITLE , setTitle] = useState<string>("");
     const[PRICE , setPrice] = useState<string>("");
     const[DESC, setDesc] = useState<string>("");

    const imageHandler=(e : React.ChangeEvent<HTMLInputElement>)=>
    {
        setFiles(e.target.files);
    }

    const handleSubmit=async(e : React.FormEvent<HTMLFormElement>)=>
    {
        e.preventDefault();

        const formData = new FormData();
           
        if(FILES && FILES.length>0)
        {
            const files = FILES;
            for( let i:number =0 ; i< files.length ; i++)
            {
               formData.append("files" , files[i]);
            } ;
        }

        if(TITLE!=="" && PRICE!=="" && DESC!=="")
       {
          formData.append("title" , TITLE);
          formData.append("price" , PRICE);
          formData.append("description" , DESC);
       }

        let responseData ;

        try
        {


           const response : Response  = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/files/upload` , {
            method : "POST" ,
             
            body : formData

           });

            responseData  = await response.json();

            if(responseData.status!==201)
            {
               throw new Error(responseData.message);
            }

            setResponse(responseData.message);
            
        }

        catch(err )
        { 
            if(err instanceof Error)
            {
                setResponse(err.message);
            }
           
        }
         
    };

    const handleTitle=(e : React.ChangeEvent<HTMLInputElement>)=>
    {
      setTitle(e.target.value);
    }

    const handlePrice=(e : React.ChangeEvent<HTMLInputElement>)=>
    {
        
         setPrice(e.target.value);
    }

    const handleDescription=(e : React.ChangeEvent<HTMLInputElement>)=>
    {
         setDesc(e.target.value);
    }

    return (
        <form onSubmit={handleSubmit} style={{display:"flex" , flexDirection:"column" , alignItems:"center" ,
        width:"50%" , margin:"100px auto" , padding:"10px" , gap:"20px" }} encType="multipart/form-data"> 

          {response ? <h3 style={{margin:"0px auto"}}>{response}</h3> : null  }
             
             <input type="file" multiple={true} name="files[]" accept='.jpg , .png , .jpeg' placeholder='upload image/images' onChange={imageHandler} /> 

             <input type="text" placeholder='title' onChange={handleTitle} />

             <input type="decimal" placeholder='price' onChange={handlePrice} />

             <input type="textarea" placeholder="description" onChange={handleDescription} />

             <button style={{backgroundColor:"skyblue" , borderRadius:"4px" , border:"none"}}> UPLOAD </button>
        </form>
    );
}

export default FileUploader;