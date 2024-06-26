module.exports = {
    module: {
     rules: [
      {
          test: /\.(woff|woff2)$/,
          use: {
            loader: 'url-loader',
            options: {
              name: 'fonts/[hash].[ext]',
              limit: 5000,
              mimetype: 'application/font-woff'
            }
          }
      },
      {
        test: /\.(ttf|eot|svg|png)$/,
        use: {
            loader: 'file-loader',
            options: {
              name: 'fonts/[hash].[ext]'
            }
        }
      }
   ]
 }
}
