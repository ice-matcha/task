import react, {Component} from 'react';
import { inject, observer } from 'mobx-react';

@inject('apples')
@observer
class Total extends Component
{
  render () {
    const { apples } = this.props;
    return (
      <div className="total">
        <div className="total_title">苹果篮子</div>
        <div className="stats">
          <div className="section">
            <div className="section_title">当前</div>
            <div>
              {apples.apple_list.length} 个苹果，{apples.apple_list.reduce((total, item) => { return total += item.weight }, 0)} 克
            </div>
          </div>
          <div className="section">
            <div className="section_title">已吃掉</div>
            <div>
              {apples.eat_list.length} 个苹果，{apples.eat_list.reduce((total, item) => { return total += item.weight }, 0)} 克
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Total;