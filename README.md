# embedded-slack

embedded-slack allows you to add a Slack built-in chat on your website. This chat can be connected to your support team.

> **Note:** :warning:
> embedded-slack has been developed as a technical try to determine if Slack can be used from a web page, to allow customers to discuss with a support team. It currently works with a test token so, **at this time, using this package in production is not recommanded**.

### Prerequisites

----------

First, you'll need to generate a [test token](https://api.slack.com/docs/oauth-test-tokens) for your Slack team. Then, you need'll to pick one channel ID from your Slack team. If you don't have any channel ID, feel free to copy/paste and run the following code to get one:

```javascript
// channels.js
const slack = require('slack')
const token = "your_test_token"

slack.channels.list({ token }, (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(data)
})
```
```bash
$ npm install slack
$ node channels.js
```

### Installation and setting up with webpack 2.x

----------

First, install embedded-slack and loaders using npm:
```bash
$ npm install --save embedded-slack
$ npm install --save-dev style-loader css-loader sass-loader
```
Then, add the following loader (lines 3 to 6) to your webpack module loaders:
```javascript
module: {
  loaders: [
    {
      test: /\.scss$/,
      loaders: [ 'style-loader', 'css-loader', 'sass-loader' ]
    }
  ]
}
```

### Usage

----------

In this example, we create an EmbeddedSlack object with the three mandatory properties:
```javascript
// index.js
import EmbeddedSlack from 'embedded-slack'

const chat = new EmbeddedSlack({
  containerId: 'embedded-slack',
  channel: 'your_channel_id',
  token: 'your_token'
})
```
```html
<!-- index.html -->
<body>
  <div id="embedded-slack" />
</body>
```

By including those lines to your code, if prerequisites and installation are setted, a blue div will appear at the bottom right of your webpage. When you will write a message in this channel from your favorite Slack client, this message will appear in the chat you've just setted; feel free to respond ! :slightly_smiling_face:

### Built With

----------

[Slack](https://github.com/smallwins/slack) - Slack Web and RTM API client for Node and the Browser

### License

----------

[MIT](LICENSE.md)
