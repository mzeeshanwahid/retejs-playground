import React, { useEffect } from "react";
import * as Rete from "rete";
import AreaPlugin from "rete-area-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import DockPlugin from "rete-dock-plugin";
import ReactRenderPlugin from "rete-react-render-plugin";
import AddComponent from "./AddComponent";
import NumComponent from "./NumComponent";
import "../styles/Rete.css";
import ContextMenuPlugin from "rete-context-menu-plugin";
const Panel = () => {

    useEffect(() => {
        async function load(){
            var container = document.querySelector('#rete');
            var components = [new NumComponent(), new AddComponent()];
            
            var editor = new Rete.NodeEditor('demo@0.1.0', container);
            editor.use(ConnectionPlugin);
            editor.use(ReactRenderPlugin);    
            editor.use(ContextMenuPlugin);
            editor.use(AreaPlugin);
            editor.use(DockPlugin, {
            container: document.querySelector('.dock'),
            itemClass: 'dock-item', //: dock-item 
            plugins: [ReactRenderPlugin] // render plugins
            });
            var engine = new Rete.Engine('demo@0.1.0');
            
            components.map(c => {
                editor.register(c);
                engine.register(c);
            });

            var n1 = await components[0].createNode({num: 2});
            var n2 = await components[0].createNode({num: 0});
            var add = await components[1].createNode();

            n1.position = [80, 200];
            n2.position = [80, 400];
            add.position = [500, 240];
        

            editor.addNode(n1);
            editor.addNode(n2);
            editor.addNode(add);

            editor.connect(n1.outputs.get('num'), add.inputs.get('num'));
            editor.connect(n2.outputs.get('num'), add.inputs.get('num2'));


            editor.on('process nodecreated noderemoved connectioncreated connectionremoved', async () => {
            console.log('process');
                await engine.abort();
                await engine.process(editor.toJSON());
            });

            editor.view.resize();
            AreaPlugin.zoomAt(editor);
            editor.trigger('process');
        }

        load();
    }, []);

    return (
        <div className="editor">
            <div className="container">
                <div className="node-editor" id="rete"></div>
            </div>
            <div className="dock"></div>
        </div>
    );
}

export default Panel;