import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, IconButton, Stack, Typography } from "@mui/material";
import React from "react";

export default function CheckOutCard(product) {
  return (
    <div className="mb-3">
      <Stack direction="row" spacing={2} className="d-flex align-items-center">
        <div>
          <Avatar
            src={product.image}
            variant="rounded"
            sx={{ height: 100, width: 100 }}
          />
        </div>
        <div>
          <Typography variant="h6" fontWeight={500} gutterBottom>
            {product.name}
          </Typography>
          <Typography>{product.price.toLocaleString()}</Typography>
        </div>
        <div>
          <div>
            <Stack
              direction={"row"}
              spacing={2}
              className="d-flex align-items-center"
            >
              <div>
                <IconButton>
                  <FontAwesomeIcon icon={faPlus} />
                </IconButton>
              </div>
              <div>
                <Typography fontWeight={300}>{1}</Typography>
              </div>
              <div>
                <IconButton>
                  <FontAwesomeIcon icon={faMinus} />
                </IconButton>
              </div>
            </Stack>
          </div>
        </div>
      </Stack>
    </div>
  );
}
