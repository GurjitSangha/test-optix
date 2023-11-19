import { Button, Dialog, DialogContent } from '@mui/material';
import React, { useState } from 'react';
import { useMedia } from 'react-use';

type Props = {
  children: JSX.Element;
};
export default function ResponsiveReviewForm({ children }: Props) {
  const isMobile = useMedia('(max-width: 480px)');
  const [openDialog, setOpenDialog] = useState(true);

  // Renders the child with the additional isMobile prop, to avoid reusing useMedia hook
  const renderChildren = () => {
    return React.cloneElement(children, {
      isMobile,
    });
  };

  if (isMobile) {
    return (
      <>
        <Button variant="contained" onClick={() => setOpenDialog(true)} sx={{ mt: 2 }}>
          Post Review
        </Button>
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogContent>{renderChildren()}</DialogContent>
        </Dialog>
      </>
    );
  }

  return <div>{renderChildren()}</div>;
}
