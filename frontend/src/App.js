import AppRoutes from "./AppRoutes";
import Header from "./Component/Header/Header";
import Loading from "./Component/Loading/Loading";
import { useEffect } from "react";
import { useLoading } from "./hooks/useLoading";
import setLoadingInterceptor from "./interceptors/loadingInterceptor";

function App() {
  const { showLoading, hideLoading } = useLoading();
  useEffect(() => {
    setLoadingInterceptor({ showLoading, hideLoading });
  }, []);
  return (
    <>
    <Loading />
    <Header/>
    <AppRoutes/>
    </>
  );
}

export default App;
