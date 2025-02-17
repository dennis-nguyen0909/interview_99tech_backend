import { Fragment, Suspense, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from './routes';
import DefaultPage from './pages/DefaultPage';
import NotFound from './pages/NotFound';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
         <Router>
             <Suspense fallback={<div>Loading....</div>}>
              <Routes>
                {routes.map((route) => {
                  const Page = route.page;
                  const Layout = route.isShowHeader ? DefaultPage : Fragment;
                  return (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={
                        <Layout showFooter={route.isShowFooter !== false}>
                          {route.isPrivate ? (
                            <NotFound />
                          ) : (
                            <Page />
                          )}
                        </Layout>
                      }
                    />
                  );
                })}
                <Route path="*" element={<NotFound />} />
              </Routes>
          </Suspense>
        </Router>
    </>
  )
}

export default App
