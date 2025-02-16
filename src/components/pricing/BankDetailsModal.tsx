import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

interface BankDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface BankDetails {
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  mobileNumber: string;
}

const BankDetailsModal: React.FC<BankDetailsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const bankDetails: BankDetails = {
    bankName: "ICICI Bank",
    accountNumber: "327601503614",
    ifscCode: "ICIC0003276",
    mobileNumber: "+91 7008065037",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Bank Transfer Details</DialogTitle>
          <DialogDescription>
            Please use these details to complete your USD payment
          </DialogDescription>
        </DialogHeader>
        <Card className="mt-4">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">Bank Name:</span>
                <span className="text-muted-foreground">
                  {bankDetails.bankName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Account Number:</span>
                <span className="text-muted-foreground">
                  {bankDetails.accountNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">IFSC Code:</span>
                <span className="text-muted-foreground">
                  {bankDetails.ifscCode}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Mobile Number:</span>
                <span className="text-muted-foreground">
                  {bankDetails.mobileNumber}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default BankDetailsModal;
