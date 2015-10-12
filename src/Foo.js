import React, { Component } from 'react';
import $ from 'jquery';

require('./semanticui/dist/components/dropdown.css');
require('./semanticui/dist/components/transition.css');

class Foo extends Component {

  constructor(props) {
    super(props);
    this.state = {value: null};
        // this is ugly
        // todo: refactor
        window.jQuery = $;
        require ('./semanticui/dist/components/api');
        require ('./semanticui/dist/components/dropdown');
        require ('./semanticui/dist/components/transition');
    }

    componentDidMount() {
        $('.ui.selection.dropdown').dropdown({
            dataType: 'jsonp',
            apiSettings   : {
                onResponse: function(githubResponse) {
                    var
                        response = {
                            results : []
                        }
                        ;
                    // translate github api response to work with dropdown
                    $.each(githubResponse.items, function(index, item) {
                        response.results.push({
                            name: item.name,
                            value: item.id
                        });
                    });
                    return response;
                },
                url: '//api.github.com/search/repositories?q={query}'
            },
            onChange: (value) => {
            this.setState({
                value
            });
            }
        });
    }

    componentDidUpdate() {
        $('.ui.dropdown').dropdown('refresh');
    }

  render() {
    return (
        <div>
            <div>
                <h2>Dropdown</h2>
                <div className="ui fluid multiple search selection dropdown">
                    <input type="hidden" name="repo-ids" />
                    <div className="default text">Select Repos</div>
                    <i className="dropdown icon"></i>
                    <div className="menu">
                    </div>
                </div>
            </div>
            <div>
                <div className="ui divider"></div>
                <b>Selected value</b> {this.state.value}
            </div>
        </div>
    )
  }
}

export default Foo;

