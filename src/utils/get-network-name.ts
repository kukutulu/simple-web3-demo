export function getNetworkName(id: number | undefined) {
  let networkName: string = "";
  switch (id) {
    case 1:
      networkName = "ETHEREUM";
      break;
    case 56:
      networkName = "BSC MAINNET";
      break;
    case 97:
      networkName = "BSC TESTNET";
      break;
    case 250:
      networkName = "FANTOM";
      break;
    default:
      networkName = "CHANGE NETWORK";
      break;
  }
  return networkName;
}
