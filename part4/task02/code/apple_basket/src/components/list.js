import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import appleImg from "../images/apple.png";

@inject('apples')
@observer
class List extends Component
{
  render () {
    const { apples } = this.props;
    return (
      <div className="list">
        {
          apples.apple_list.length === 0 ? (<div className="empty-tip">苹果篮子里只有空气</div>) :
          apples.apple_list.map((item, index) => {
            return (
              <div key={index} className="apple-item">
                <img className="apple" src={appleImg} alt="apple-img" />
                <div className="info">
                  <div className="name">红苹果 - {item.number} 号</div>
                  <div className="weight">重量 {item.weight} 克</div>
                </div>
                <div onClick={() => apples.eatApple(index)} className="btn_eat">吃掉</div>
              </div>
            )
          })
        }
        
        <div className="footer">
          <button onClick={apples.addApple}>摘苹果</button>
        </div>
      </div>
    )
  }
}

export default List;