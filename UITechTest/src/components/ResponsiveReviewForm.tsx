import { Button, Dialog, DialogContent } from '@mui/material';
import { useState } from 'react';
import { useMedia } from 'react-use';

type Props = {
  children: JSX.Element;
};
export default function ResponsiveReviewForm({ children }: Props) {
  const isMobile = useMedia('(max-width: 480px)');
  const [openModal, setOpenModal] = useState(true);

  if (isMobile) {
    return (
      <>
        <Button variant="contained" onClick={() => setOpenModal(true)} sx={{ mt: 2 }}>
          Post Review
        </Button>
        <Dialog open={openModal} onClose={() => setOpenModal(false)}>
          <DialogContent>{children}</DialogContent>
        </Dialog>
      </>
    );
  }

  return <div>{children}</div>;
}
