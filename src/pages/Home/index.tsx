import { Button } from '../../Components/Buttons';
import { News} from '../../Components/AllNews';
import { FaveNews } from '../../Components/Favenews';
import { ChangeEvent, useState } from 'react';

const toggleOptions = ['All', 'My Faves'];

export  function Home() {

  const [selectedView, setSelectedView] = useState(toggleOptions[0]);

  const handleToggleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedView(e.target.value);
  };

  return (
    <>
      <Button options={toggleOptions} onChange={(e) => handleToggleChange(e)}/>
      {selectedView === 'All' && <News />}
      {selectedView === 'My Faves' && <FaveNews />}
    </>
  );
}