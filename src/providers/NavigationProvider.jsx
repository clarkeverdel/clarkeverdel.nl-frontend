import { useState, createContext, useEffect } from 'react';

const NavigationContext = createContext({
  navigationItems: [],
  loading: true
});

const NavigationProvider = props => {
  const [loading, setLoading] = useState(true);
  const [navigationItems, setNavigationItems] = useState({});

  useEffect(() => {
    const headerMenuRes = fetch(
      `${Config.apiUrl}/wp-json/menus/v1/menus/header-menu`,
    ).then(response => {
      setNavigationItems(response.json())
      console.log(response)
    });
  }, []);

  return (
    <NavigationContext.provider value={{
      navigation: {
        navigationItems,
        loading
      }
    }}
    >
      {props.children}
    </NavigationContext.provider>
  );
}

export default NavigationProvider;
