import React from 'react';
import {createRoot} from 'react-dom/client';
import { useState, useEffect } from "react";
import Pagination from "./Pagination.jsx";
import Tags from "./Tags.jsx";

function Posts({baseUrl}){
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage]= useState(1);
    const itemsPerPage = 5;

    useEffect( () =>{
        fetchDatas();
    }, []);
    
    const fetchDatas = async () => {
        try{
            const response = await fetch('/fr/api/posts', {
                headers: {
                    'Accept': 'application/json',
                }
            }).then(r =>r.json())
            console.log(response)
            setPosts(response);
            setLoading(false);

        } catch(error){
            console.log(error);
        }
    }

    const handlePageChange = (page) => {
        event.preventDefault()
        setCurrentPage(page)
    }

    const paginated = Pagination.getData(posts, currentPage, itemsPerPage);

    return <>
        {loading && <>Chargement ... </>}
        {!loading && paginated.map(post =>
       
        <article className="post" key={post.id}>
            <h2>
            <a href={baseUrl.replace('__slug__', post.slug)}>
                    { post.title }
                </a>
            </h2>

            <p class="post-metadata">
                <span className="metadata"><i class="fa fa-calendar"></i> { post.publishedAtLocal }</span>
                <span className="metadata"><i class="fa fa-user"></i> { post.author.fullName }</span>
            </p>

            <p>{ post.summary }</p>

            {/*{ include('blog/_post_tags.html.twig') }*/}
            <Tags list={post.tags} />
        </article>
        )}

        {itemsPerPage < posts.length &&
            <Pagination currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        length={posts.length}
                        onPageChanged={handlePageChange}
            />
        }
    </>
}

class PostsElement extends HTMLElement{
    connectedCallback (){
        //charger route pour éviter bug react 18
        const root = createRoot(this)
        const baseUrl = this.dataset.url
        root.render(<Posts baseUrl={baseUrl} />)
    }
}

customElements.define('posts-component', PostsElement);