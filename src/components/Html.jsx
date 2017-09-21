import React, { Component } from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';
import config from 'config';

class Html extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    styles: PropTypes.arrayOf(PropTypes.string.isRequired),
    scripts: PropTypes.arrayOf(PropTypes.string.isRequired),
    app: PropTypes.object, // eslint-disable-line
    children: PropTypes.string,
    favicon: PropTypes.string.isRequired,
    preloadedState: PropTypes.object, // eslint-disable-line
  };

  static defaultProps = {
    styles: [],
    scripts: [],
    children: '',
    app: config,
    favicon: '',
  };

  render() {
    const { title, description, favicon, styles, scripts, app, preloadedState, children } = this.props;
    return (
      <html className="no-js" lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <title>
            {title}
          </title>
          <meta name="description" content={description} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {scripts.map(script =>
            <link key={script} rel="preload" href={script} as="script" />,
          )}
          <link rel="apple-touch-icon" href="apple-touch-icon.png" />
          <link rel="shortcut icon" href={favicon} type="image/x-icon" />
          {styles.map(style =>
            (<link key={style} rel="stylesheet" href={style} type="text/css" />),
          )}
        </head>
        <body>
          <div
            id="app"
            dangerouslySetInnerHTML={{ __html: children }} // eslint-disable-line react/no-danger
          />
          <script
            key="preloaded"
            dangerouslySetInnerHTML={{ __html: `window.PRELOADED_STATE=${serialize(preloadedState)}` }} // eslint-disable-line react/no-danger
          />
          <script
            key="app"
            dangerouslySetInnerHTML={{ __html: `window.App=${serialize(app)}` }} // eslint-disable-line react/no-danger
          />
          {scripts.map(script => <script key={script} src={script} />)}
        </body>
      </html>
    );
  }
}

export default Html;

