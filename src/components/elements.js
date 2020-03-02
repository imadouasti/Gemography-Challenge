import React from 'react'
import './element.css'
import axios from 'axios'
import date_difference from '../actions/date_difference'

class Elements extends React.Component{
    constructor(){
        super()
        this.state = {
            page : 1,
            repos: []
        }
        this.handleScroll = this.handleScroll.bind(this);
        this.loadRepos = this.loadRepos.bind(this);
    }

    componentWillMount(){
        this.loadRepos()
        window.addEventListener("scroll", this.handleScroll);
    }

    componentDidMount(){
        const page = this.state.page
        if(this.state.bottom === true){
            this.setState({
                page: page+1
            })
            this.loadRepos()
        }
    }

    componentWillUnmount(){
        window.removeEventListener("scroll", this.handleScroll);
    }
    
    render(){
        const repositories = this.state
        const reposList = repositories.repos.map(e => {
            return(
                <div className="wrapper">
                            <div className="avatar">
                                <img alt={e.name} src={e.avatar} />
                            </div>
                            <div className="infos">
                                <h3 className="title">{e.name}</h3>
                                <p className="desc">{e.description}</p>
                                <div className="caracs">
                                    <p className="stars">Stars : {e.stars}</p>
                                    <p className="issues">Issues : {e.issues}</p>
                                    <p className="submission">Submitted {date_difference(e.date)} days ago</p>
                        </div>
                    </div>
                </div>
            )
        })
            return(
                <div className="mother">
                      {reposList}  
                </div>
            )
    }

    loadRepos(){
        axios({
            url : "https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc",
            method : 'GET',
            params: {
                page: this.state.page
            }
        }).then((response) =>{
            const nextRepos = response.data.items.map(r =>({
                name : r.name,
                description : r.description,
                stars : r.stargazers_count,
                issues : r.open_issues,
                avatar : r.owner.avatar_url,
                date: r.created_at
            }))
            this.setState({
                repos : [...this.state.repos,...nextRepos]
            })
        })
    }

    handleScroll() {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
            this.setState({
                page: this.state.page+1
            })
            this.loadRepos()
        }
    }
}

export default Elements