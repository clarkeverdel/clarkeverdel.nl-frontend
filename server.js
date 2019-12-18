const express = require("express");
const next = require("next");
const bodyParser = require('body-parser');

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const mailer = require('./mailer');

app
    .prepare()
    .then(() => {
        const server = express();

        server.use(bodyParser.json());

        // server.post('/api/contact', (req, res) => {
        //   const { email, name } = req.body
        //   console.log(req.body)
        //   res.send('success')
        // })

        server.post('/api/contact', (req, res) => {
          const { email = '', name = '', reason = '', description = '' } = req.body;
          const emailHeading = `<p><strong>Reason of contacting: ${reason}</strong></p>`;
          const emailBody = `<p>${description}</p>`;
          let status = '';

          mailer({ email, name, text: emailHeading + emailBody }).then((response) => {
            status = 'Successfully sent an email via the contact form.';
            res.send(status);
          }).catch((error) => {
            status = 'Failed sending the contact form';
            res.send(status);
          });

          return status;
        });

        server.get("/post/:slug", (req, res) => {
            const actualPage = "/post";
            const queryParams = { slug: req.params.slug, apiRoute: "post" };
            app.render(req, res, actualPage, queryParams);
        })

        // server.get("/page/:slug", (req, res) => {
        //     const actualPage = "/post";
        //     const queryParams = { slug: req.params.slug, apiRoute: "page" };
        //
        //     app.render(req, res, actualPage, queryParams);
        //
        // });

        server.get("/:slug", (req, res) => {
            const actualPage = "/post";
            const queryParams = { slug: req.params.slug, apiRoute: "page" };

            const actualPageBlog = "/contact";

            if(req.params.slug === "contact") {
              app.render(req, res, actualPageBlog, queryParams);
            }
            else {
              app.render(req, res, actualPage, queryParams);
            }

        });


        server.get("/project/:slug", (req, res) => {
            const actualPage = "/post";
            const queryParams = { slug: req.params.slug, apiRoute: "projects" };
            app.render(req, res, actualPage, queryParams);
        });
/*
        server.get("/_preview/:id/:wpnonce", (req, res) => {
            const actualPage = "/preview";
            const queryParams = { id: req.params.id, wpnonce: req.params.wpnonce };
            app.render(req, res, actualPage, queryParams);
        });
*/

        server.get("*", (req, res) => {
            return handle(req, res);
        });

        server.listen(3000, err => {
            if (err) throw err;
            console.log("> Ready on http://localhost:3000");
        });
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });
