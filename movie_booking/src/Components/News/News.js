import React from 'react'
import Img from '../Assets/News-img.png'
import './News.css'

const News = () => {
    return (
        <div className="news">
          <div className="news-container">
            <div className="title">
              <h2>News</h2>
            </div>
            <div className="post">
              <div class="child-post">
              <a href="#">
                <img src={Img} alt="" />
                <div className="post-category">
                  <span>Spotlight</span>
                </div>
                  <span>The truth about Trinh's character, a different appearance than what people usually see!.</span>
                  <div className="more-info-post">
                    <div>
                    <p className="date">09 Oct 2023</p>
                    </div>
                    <div class="divider"></div>
                    
                    <div>
                    <p className="author">CNEMA</p>
                    </div>
                    
                </div>
              </a>
                
              </div>
              <div class="child-post">
              <a href="#">
                <img src={Img} alt="" />
                <div className="post-category">
                  <span>Spotlight</span>
                </div>
                  <span>The truth about Trinh's character, a different appearance than what people usually see!.</span>
                  <div className="more-info-post">
                    <div>
                    <p className="date">09 Oct 2023</p>
                    </div>
                    <div class="divider"></div>
                    
                    <div>
                    <p className="author">CNEMA</p>
                    </div>
                    
                </div>
              </a>
                
              </div>
              <div class="child-post">
              <a href="#">
                <img src={Img} alt="" />
                <div className="post-category">
                  <span>Spotlight</span>
                </div>
                  <span>The truth about Trinh's character, a different appearance than what people usually see!.</span>
                  <div className="more-info-post">
                    <div>
                    <p className="date">09 Oct 2023</p>
                    </div>
                    <div class="divider"></div>
                    
                    <div>
                    <p className="author">CNEMA</p>
                    </div>
                    
                </div>
              </a>
                
              </div>
    
            </div>
          </div>
        </div>
      )
    }

export default News