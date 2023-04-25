import LoadingOverlay from 'react-loading-overlay';
LoadingOverlay.propTypes = undefined;
 
export default function MyLoader({ active, children }) {
  return (
    <LoadingOverlay
    active={active}
    spinner
    text='Loading...'
    >
    {children}
  </LoadingOverlay>
  )
}