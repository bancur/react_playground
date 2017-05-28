import React from 'react';
import {render} from 'react-dom';
import Masonry from 'react-masonry-component';

class ServerModel
{
    constructor()
    {
        this.name = 'Some server';
        this.description = 'This is a mock server.';
        this.ip = '192.168.0.15';
    }

}

class ApiMock
{
    getServer(id)
    {
        if(id == 1)
        {
            return new ServerModel;
        }
        else if(id == 2)
        {
            var server = new ServerModel;
            server.name = "Another server";
            server.description = "This one is different";
            server.ip = "10.25.15.1";

            return server;
        }
    }
}

class ServerLink extends React.Component {
    render()
    {
        return (
                <a href="#show" onClick={() => {this.props.passed()}}>{this.props.serverId}</a>
                );
    }
}

class ServerSelector extends React.Component {

    passedFunction()
    {
        console.log('This callback has been passed from the component above.');
    }

    render()
    {
        return (<div id="server-selector">
                <ServerLink serverId="1" passed={() => {this.props.passed(1)}}/> |
                <ServerLink serverId="2" passed={() => {this.props.passed(2)}}/>
            </div>);
    }
}

class App extends React.Component {
    constructor()
    {
        super();
        var apiMock = new ApiMock;

        this.state = {
            api: apiMock,
            server: new ServerModel,
        }
    }

    changeDisplayedServer(id)
    {
        console.log('called change displayed server.');
        var model = this.state.api.getServer(id);
        console.log(model);
        this.setState({server: model});
    }

    topLevelCallback(id)
    {
        console.log("This callback was passed from the parent. Two levels above from here.");
        console.log("Passed id: " +id);
        this.changeDisplayedServer(id);
    }

    render()
    {
        return (<div id="serverCard">
                    <b>Server name:</b> {this.state.server.name} <br />
                    <b>Description:</b> {this.state.server.description} <br />
                    <b>IP:</b> {this.state.server.ip}
                    <ServerSelector passed={(id) => {this.topLevelCallback(id) }} />
                </div>);
    }
}

var masonryOptions = {
    transitionDuration: 0
}

class Gallery extends React.Component {
    render()
    {
        var childElements = this.props.elements.map(function(element){
            return(
                <li key={element.id} className="image-element-class">
                    <img src={element.src} />
                </li>);
        });

        return (
                <Masonry
                    className={'my-gallery-class'}
                    elementType={'ul'}
                    options={masonryOptions}
                    disableImagesLoaded={false}
                    updateOnEachImageLoad={false}>
                    {childElements}
                    </Masonry>
            )
    }
}

var myModel = new ServerModel;

var element1 = {id: 1, src: 'http://i.imgur.com/OrQ2F7N.jpg'};
var element2 = {id: 2, src: 'http://i.imgur.com/OrQ2F7N.jpg'};
var elementsArray = [element1, element2];

//render(<App server={myModel} />, document.getElementById('app'));
render(<Gallery elements={elementsArray}/>, document.getElementById('app'));