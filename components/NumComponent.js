import Rete from "rete";
import NumControl from "./NumControl";
import { numSocket } from "./NumSocket";

class NumComponent extends Rete.Component {
  constructor() {
    super("Number");
  }

  builder(node){
    var out1 = new Rete.Output("num", "Number", numSocket);

    return node.addControl(new NumControl(this.editor, "num", true)).addOutput(out1);
  }

  worker(node, inputs, outputs) {
    outputs["num"] = node.data.num;
  }
}

export default NumComponent;