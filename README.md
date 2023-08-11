# twitch-pong-overlay
A Pong game overlay for OBS that can be controlled via Xbox 360 controllers and Twitch chat commands.

## Features

- Play Pong directly in Twitch chat.
- Control the game using Xbox 360 controllers.
- Embed the game as an overlay in OBS.

## Installation

1. Clone the repository: `git clone https://github.com/graylan0/twitch-pong-overlay.git`
2. Navigate to the project folder: `cd twitch-pong-overlay`
3. Install dependencies: `npm install`
4. Create a `.env` file in the root directory with the following content:
   ```env
   TWITCH_BOT_USERNAME=your_bot_username
   TWITCH_BOT_TOKEN=oauth:your_bot_token
   TWITCH_CHANNEL=your_channel_name
## Usage

- Twitch chat commands: `!upa`, `!downa`, `!upb`, `!downb` to control the paddles.
- Xbox 360 controllers are also supported.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the GPL2 License - see the [LICENSE.md](LICENSE.md) file for details.
