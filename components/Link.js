import { withRouter } from 'next/router'
import Link from 'next/link'
import React, { Children } from 'react'

const ActiveLink = ({ router, children, ...props }) => {
  const child = Children.only(children)

  let className = child.props.className || null

  // Check for real path, but also for asPath for our case
  if (router.pathname === props.path || router.asPath === props.as && props.activeClassName) {
    className = `${className !== null ? className : ''} ${props.activeClassName}`.trim()
  }

  delete props.activeClassName

  return <Link {...props}>{React.cloneElement(child, { className })}</Link>
}

export default withRouter(ActiveLink)