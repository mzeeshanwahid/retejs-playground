import Rete from "rete";
import MyReactControl from "./MyReactControl";

class NumControl extends Rete.Control{

    constructor(emitter, key, readonly) {
      super(key);
      this.render = 'react';
      this.component = MyReactControl;
      
      this.key = key;
      this.props = {
        value: '',
        onChange: v => {
          this.setValue(v),
          emitter.trigger('process');
        },
        readonly,
        mounted: () => this.setValue(this.getData(this.key)) };
    }
    
    setValue(val) {
      this.props.value = val;
      this.putData(this.key, val)
      this.update();
    }
  };

  export default NumControl;