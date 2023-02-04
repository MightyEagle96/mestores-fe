import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { httpService, loggedInUser } from "../../httpService";

export default function CheckOutCard(c) {
  const increaseItem = async (quantity, product) => {
    const res = await httpService.patch(
      `mestore/increasequantity/${loggedInUser._id}`,
      { quantity, product }
    );

    if (res) {
      // c.ge;
    }
  };
  return (
    <div className="mb-3">
      <Stack direction="row" spacing={3} className="d-flex align-items-center">
        <div>
          <Avatar src={c.product.image} sx={{ height: 100, width: 100 }} />
        </div>
        <div>
          <Typography fontWeight={500}>{c.product.name}</Typography>
          <Typography variant="subtitle2" fontWeight={400}>
            ₦{c.product.price.toLocaleString()}
          </Typography>
        </div>
        <div>
          <div>
            <Stack
              direction={"row"}
              spacing={1}
              className="d-flex align-items-center"
            >
              <IconButton color="warning" size="small">
                <FontAwesomeIcon icon={faPlus} />
              </IconButton>

              <Typography fontWeight={700}>{c.quantity}</Typography>

              <IconButton size="small" color="warning">
                <FontAwesomeIcon icon={faMinus} />
              </IconButton>
            </Stack>
          </div>
        </div>
        <div>
          <Typography variant="caption" gutterBottom>
            Unit Price
          </Typography>
          <Typography>₦{c.unitPrice.toLocaleString()}</Typography>
        </div>
      </Stack>
      <hr />
    </div>
  );
}
