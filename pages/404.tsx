import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import EmptyLayout from "../components/EmptyLayout";

export default function NotFound(){

  const router = useRouter();

  return (
    <div className="contents">
      <Image src="/404.png" width='500px' height='500px' alt="404-lego"></Image>
      <div className="guide">
        <strong>404 Not Found</strong>
        <p>Sorry, that page can`t be found</p>
        <button onClick={() => router.push(`/`)}>
          <span>Go to Homepage
              <FontAwesomeIcon icon={faAngleRight} width="15px" height="15px"
              style={{position:'relative', top:'2.7px', marginLeft:'5px'}}></FontAwesomeIcon>
          </span>
        </button>
      </div>
      
      <style jsx>{`
        .guide{
          margin-left: 50px;
          text-align:center;
        }
        .guide strong {
          font-size : 60px;
        }
        .guide p{
          font-size : 25px;
        }
        button{
          box-sizing: border-box;
          outline: 0;
          border: 0;
          margin: 0;
          cursor: pointer;
          user-select: none;
          vertical-align: middle;
          -webkit-appearance: none;
          font-family: "Roboto","Helvetica","Arial",sans-serif;
          font-weight: 500;
          font-size: 0.875rem;
          line-height: 1.75;
          letter-spacing: 0.02857em;
          text-transform: uppercase;
          min-width: 64px;
          padding: 6px 16px;
          border-radius: 4px;
          transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
          color: black;
          text-decoration: none;
          box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12);
          background-color: rgb(255, 207, 0);
        }
        button:hover {
          background-color:black;
          color:white;
        }
        .contents{
          min-height:100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
      `}</style>
    </div>
  )
}

NotFound.getLayout = function getLayout(page: React.ReactElement){
  return(
    <EmptyLayout>{page}</EmptyLayout>
  )
}