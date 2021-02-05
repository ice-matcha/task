import { computed, observable } from 'mobx';

class AppleStore
{
  @observable apple_list = [];
  @observable eat_list = [];
  number = 1;

  addApple = () => {
    this.apple_list.push({
      number: this.number,
      weight: Math.floor(215 + 15 * (Math.random(0, 1)))
    });
    this.number += 1;
  }

  eatApple = (index) => {
    this.eat_list.push(this.apple_list[index]);
    this.apple_list.splice(index, 1);
  }
}

const apples = new AppleStore();
export default apples;