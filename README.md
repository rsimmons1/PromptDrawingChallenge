# Prompt Drawing Challenge Website

Website for displaying the incredible art from the year long challenge done by Pat Plunket (@drknotter).
<p align="center">
<img src="https://2022-prompt-drawings.s3.amazonaws.com/2022/20220101_purge.png" width="350" title="Example prompt image">
</p>

Website Link: https://2022-prompt-drawings.s3.amazonaws.com/index.html

## Developer Stuff

The website is a static deployment using:
- [AWS S3](https://aws.amazon.com/s3/) for static website hosting
- [AWS S3](https://aws.amazon.com/s3/) for image hosting
- Frontend uses standard JS, CSS, HTML w/ [Node](https://nodejs.org/en/) + [Browserify](https://browserify.org/) for dependencies + bundling

All the JS dependencies get bundled into a single script named `bundle.js` that is included in as a script tag.

## Setup

### Node
Download node on your plaform, on OSX it is probably using homebrew, on Windows download it from the Node website

### Setting Up Project

Following commands install browserify and the local dependencies for the project

```
npm install -g browserify
npm install .
```

### Local Deployment

To bundle the JS code into a single script (do this whenever you update the JS)

```
browserify main.js -o bundle.js
```

To setup a local server for development

```
python3 -m http.server
```

## S3 Deployment

### Manual Method
When ready, simply upload the html + JS files into the S3 bucket.

### CLI Method
1. Download the AWS CLI
2. Run AWS CLI Configure (Follow [AWS guide](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html) for details gettign access key)
```
aws configure
``` 


3. cd into the page that needs to be updated in `pages/`
4. Run command
```
aws s3 sync . s3://2022-prompt-drawings/<page_name>/
```

### Updating Prompt Paths
The paths to all the prompt files are stored in a file named `2022_prompt_paths.json`.
If the drawing files in the S3 bucket get updated run the following command:

```
node update-s3-prompts.cjs
```

Then upload the resulting `2022_prompt_paths.json` file to the S3 bucket.

## Resources

S3 Bucket:
- Name: 2022-prompt-drawings
- Console link: https://s3.console.aws.amazon.com/s3/buckets/2022-prompt-drawings

AWS JS SDK:
https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/
