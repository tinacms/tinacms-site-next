---
title: FAQ
last_edited: '2022-01-24T15:50:19.525Z'
---

## What is Tina Cloud?

Tina Cloud is a hosted [datalayer](/docs/reference/content-api/datalayer) for TinaCMS. Tina Cloud is the easiest way to use TinaCMS in production. It provides a hosted GraphQL endpoint for your content, Git integration, user management, editorial workflow features and more. It also grants authorization for other users (content creators, editors, marketers, etc) to login and edit their site without needing to grant direct access to the repository in GitHub. TinaCMS can be [self-hosted](/docs/self-hosted/overview) or used independently of Tina Cloud as well.

For more information, see [Tina Cloud Overview](/docs/tina-cloud/overview).

## Where do I get help?

* [Find us on Discord](https://discord.com/invite/zumN63Ybpf)
* For business inquiries contact [info@tina.io](mailto:info@tina.io)

## Features unavailable in self-hosted Tina compared to Tina Cloud

When comparing Tina Cloud with self-hosting Tina, there are specific features unique to Tina Cloud. These include:

### 1. Git Backed Media

In Tina Cloud, there's a Git backed media feature. This integrates media into the Tina Media Manager and commits it directly to the Git repository. However, this functionality is not present in self-hosted Tina.

The reason for its absence is due to the process involving media uploads. When using the media manager in Tina Cloud, images are uploaded to Tina Cloud servers and distributed via a CDN. This ensures that images are accessible through the Tina Media Manager, as they require a URL for accessibility. Without this, images won't appear in the Media Manager until the site is rebuilt.

### 2. Dynamic Branch Switching at Runtime

Tina Cloud allows for changing the content branch at runtime, a feature managed through URL modification. However, in self-hosted Tina, changing branches is restricted to the build phase only.

This limitation means that commands like:

```ts
client.queries.page({ relativePath: 'home.mdx' }, { branch: 'main' })
```

are not functional in a self-hosted Tina setup.

### 3. Search

The self-hosted backend does not currently have endpoints to support search functionality.

## Why do I need a database when using markdown?

A database is essential when using markdown with TinaCMS because the Data Layer, which serves Markdown and JSON files, relies on a database to perform various content management functions. While the Markdown files are the primary source of your content, the database acts as a cache to enable advanced features like search, pagination, and cross-referencing between files. It also provides an API, allowing content fetching akin to traditional headless CMS operations. Initially, TinaCMS's Data Layer operates unnoticed during local development and is managed by Tina Cloud in production. With the introduction of self-hosted options, users can now opt for more control and customization, integrating their own authentication systems and hosting. The entire TinaCMS, including its Data Layer, is open-source, allowing for community-driven enhancements and support.

## What is "Local Mode" vs "Prod Mode"?

### Local-Mode

When developers are developing locally, it's often convenient to load/save content from their local filesystem rather than connecting to the content on Tina Cloud.

When in local-mode, you **will not** need to login to enter edit-mode.

<div class="short-code-warning">
   <div>
      <p>Note: Local-mode is meant for developing locally, and will not work when your site is hosted on production. When in local-mode, Tina tries to hit `http://localhost:4001`, which isn't available at runtime on your production site (and neither is the underlying filesystem content).</p>
   </div>
   <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 464h448L256 48 32 464zm248-64h-48v-48h48v48zm0-80h-48v-96h48v96z"></path>
   </svg>
</div>

### Prod-Mode

Once you are ready to host your site in production and put editing behind authentication, you can self-host the CMS backend yourself or you can use TinaCloud's hosted backend.

Whether you're [self-hosting](/docs/self-hosted/overview) Tina or using [Tina Cloud](/docs/tina-cloud/dashboard/), Tina's Content API authenticates directly with GitHub removing the need for users to create GitHub accounts. Any changes that are saved by your editors will be committed to the configured branch in your GitHub repository.

## Does Tina Cloud only work with GitHub repositories?

Currently, yes, the first Git provider that Tina Cloud integrates with is GitHub. Other Git providers may be available in the future.

## How can I share an idea or get help using Tina Cloud?

* If you haven't checked yet, the [docs](/docs/) may have the answer you are looking for!
* Connect with us on [Discord](https://discord.com/invite/zumN63Ybpf).
* We can help you at [support@tina.io](mailto:support@tina.io). Email us if you would like to schedule a chat!
* Chat with us from your Tina Cloud dashboard (there's a chat widget on the bottom right of the browser window).

## What is the pricing for Tina Cloud?

There will be no cost for small teams to use Tina Cloud while it is in Beta.

A fair use policy will be coming soon.

We will contact you if we believe your use case may eventually fit within our post-beta paid plans.

## Does Tina Cloud work with Monorepos?

It does! Tina Cloud can work with sites inside monorepos by specifying the path to your `tina` folder in your Project configuration.

If your repo is not a monorepo, there's no need to do any configuration. We'll expect your `tina` folder at the root of your repo.

Here's an example monorepo structure that works with Tina Cloud:

```
    /projects/site-a
    /projects/site-b
    /projects/site-c
```

See [Path To Tina](/docs/tina-cloud/dashboard/projects/#path-to-tina) for more information.

## How do I resolve the `Unable to find record 'tina/__generated__/_graphql.json'` error?

Tina Cloud's GraphQL API returns this error when it cannot find a file in your GitHub repository. This may occur under the following circumstances:

* The `tina` folder (and `__generated__` subfolder) is not in your GitHub repository remote.
  * If the folder is in your local repository, but not in your remote, make sure there isn't a `.gitignore` file excluding it.
* Tina is configured with a branch that doesn't exist or a branch that doesn't contain the `tina` folder.
  * The referenced branch should be created and should contain the `tina` folder.
* The apiURL prop is misconfigured on the TinaCMS component.
  * Check the apiURL and make sure it looks like `https://content.tinajs.io/content/{tina_client_id}/github/{branch}` where `{tina_client_id}` matches the Client ID on the Project in Tina Cloud and `{branch}` is a valid branch.

## Tina.io login window doesn't close when logging in from a site

When a user logs in from your site, we will pop open a login window. When login is complete, we will attempt to send a message back to the main window.

The most common reasons for this issue are:

* The Site URL is not properly set for the Tina project. The main window's base URL will need to match the Tina project's Site URL setup in the Tina Cloud Dashboard.
* The Client ID setup in your site's environment variables does not match the Client ID in your project's settings on the Tina Cloud dashboard.
* The user attempting to login to Tina Cloud does not have access to edit this site. Ensure that this user is authorized on the Tina Cloud dashboard.

> Make sure to include `https` in the Site URL eg: [https://tina.io](https://tina.io) or if you are testing locally, it might be something like `http://localhost:3000`

## How do I resolve "The local GraphQL schema doesn't match the remote GraphQL schema." errors?

If you are getting this error in your build logs, it means that the tina/tina-lock.json in your deployed site doesn't match the version that is in Tina Cloud. To resolve it, make sure you have latest versions of @tinacms/cli and tinacms in your project, and then run the dev command locally. Commit any changes to the tina/tina-lock.json and push those to the git repository linked in Tina Cloud.

If you are getting this error when access the TinaCMS interface, it can be caused by a mismatch between the version of tinacms and @tinacms/cli on the project. Update both dependencies to the latest versions and run the dev command locally. Commit any changes to the tina/tina-lock.json and push those to the git repository linked in Tina Cloud.

## How do I resolve errors caused by unindexed branches?

If you receive an error like `The specified branch, 'my-branch-name', has not been indexed by Tina Cloud`, first verify that the correct branch has been specified in
the config properties passed to defineConfig in `tina/config.ts`. Note, that this value may be set as an environment variable in your CI build process. Second, verify that the branch exists
in the GitHub repository. Lastly, you can force a reindexing of a particular branch by making a whitespace change to the `tina/tina-lock.json` file in that branch,
commit the change, and push it to GitHub. This will initiate indexing for the branch and (after a few minutes) the error should be resolved.

## How do I resolve "Failed loading TinaCMS assets" error

This error means that the TinaCMS admin HTML file failed to load the JavaScript bundle. This generally happens for a few reasons:

### User has pushed the development admin/index.html to production

When you run `tinacms dev` locally, Tina will generate a development admin/index.html file, which loads its assets from localhost. For production, this file should be built in CI using `tinacms build`. If a developer manually removes the admin/index.html file from their `.gitignore`, they may run into this issue.

### Site is building on a sub-path

There is a known limitation where Tinacms doesn't load assets correctly when the admin is deployed to a sub-path: (`https://jamespohalloran.github.io/my-site-root/admin/` for example). To resolve the issue, set the `build.basePath` property to value of the sub-path (e.g. `my-site-root`).

## Enabling co-author on Git commits

By default when using Tina Cloud, the author on Git commits is the Tina Cloud GitHub [app](https://github.com/apps/tina-cloud-app). It is possible to [co-author](https://docs.github.com/en/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/creating-a-commit-with-multiple-authors) Git commits in order to attribute the commit to an additional user. This can be enabled per-user in the Tina Cloud account [settings](https://app.tina.io/account/settings). By default, the name and email of the co-author is configured according to your Tina Cloud account, but they can be set to any valid name and email address. Once configured, click the "Enable co-authoring" toggle and the "Save Settings" button.

> **Note:** The co-author email is publicly viewable on GitHub. If you want to hide your email, GitHub provides an anonymous email address for each user. You can find your anonymous email address in the GitHub email [settings](https://github.com/settings/emails). This email address can then be configured in Tina Cloud as the co-author.
