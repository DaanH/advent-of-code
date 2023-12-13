describe('day 16', () => {
  function padLeft(source, len, fill) {
    return new Array(len - source.length).fill(fill).join('') + source
  }
  function convertToBinary(source) {
    return [...source].reduce((acc, char) => {
      const code = char.charCodeAt(0);
      const num = (code > 64 ? code - 55 : code - 48);
      return acc + padLeft(num.toString(2), 4, '0');
    }, '');
  }
  function getPacket(bits, level = 0) {
    console.log('parse packet at level ', level, ':', bits.substring(0, 7));
    if (level > 40 || !bits) {
      console.warn('something is wrong')
      return;
    }
    const version = bits.substring(0, 3)
    const typeID = parseInt(bits.substring(3, 6), 2);
    if (typeID === 4) {
      let num = '';
      index = 6;
      while (bits[index] === '1') {
        num += bits.substring(index + 1, index + 5);
        index += 5;
      }
      num += bits.substring(index + 1, index + 5);
      index += 5;
      console.log('found literal', num);
      return { version, typeID, num: parseInt(num, 2), size: index };
    } else {
      const lengthTypeID = bits[6];
      let subPacketsBitLength;
      let subPackets = [];
      let subPacketsBits;
      let size = 0;
      let subIndex = 0;
      // console.log('found operator with lengtypeID', lengthTypeID)
      if (lengthTypeID === '0') {
        subPacketsBitLength = parseInt(bits.substring(7, 7 + 15), 2);
        // console.log(subPacketsBitLength, 'bits of subpackets')
        subPacketsBits = bits.substring(22, 22 + subPacketsBitLength);
        let subPacket;

        while (subIndex < subPacketsBitLength && (subPacket = getPacket(subPacketsBits.substring(subIndex), level + 1))) {
          // console.log(level, 'got another subpacket at', subIndex);

          // console.log('found subPacket', subPacket)
          subPackets.push(subPacket);
          subIndex += subPacket.size;
        }
        size = 22 + subPacketsBitLength;
        // console.log('done getting', subPackets.length, ' subpackets at level', level)
      } else if (lengthTypeID === '1') {
        const subPacketsCount = parseInt(bits.substring(7, 7 + 11), 2);
        subPacketsBits = bits.substring(18);
        // console.log('fetching', subPacketsCount, 'subpackets from', subPacketsBits)
        for (let i = 0; i < subPacketsCount; i++) {
          console.log(level, 'getting subpacket nr', i, 'at', subIndex);
          subPacket = getPacket(subPacketsBits.substring(subIndex), level + 1);
          subPackets.push(subPacket);
          subIndex += subPacket.size;
        }
        size = subIndex + 18;
        // console.log('done getting', subPackets.length, 'of', subPacketsCount, 'subpackets at level', level)
      } else {
        // console.warn('no lengthTypeID!!')
      }
      return { version, typeID, subPackets, size }
    }
  }

  function getVersionSum(packet) {
    let packets = [packet];
    let i = 0;
    while (p = packets[i++]) {
      // console.log(packets)
      if (p.subPackets)
        packets = [...packets, ...p.subPackets];
    }
    const versions = packets.map(p => parseInt(p.version, 2));
    console.log({ amount: versions.length, versions })
    const sum = versions.reduce((acc, v) => acc + v, 0);
    return sum;
  }
  /*
  test('part 1a', () => {
    const bin = convertToBinary('D2FE28')
    expect(bin.length).toEqual(24)
    expect(bin).toEqual('110100101111111000101000');

    const packet = getPacket(bin);
    expect(packet).toEqual({ typeID: 4, version: '110', num: 2021, size: 21 });
  });
  test('part 1b', () => {
    const bin = convertToBinary('38006F45291200')
    expect(bin).toEqual('00111000000000000110111101000101001010010001001000000000');

    const packet = getPacket(bin);
    expect(packet.subPackets.length).toEqual(2)
    expect(packet.subPackets[0]).toEqual({ version: '110', typeID: 4, size: 11, num: 10 })
    expect(packet.subPackets[1]).toEqual({ version: '010', typeID: 4, size: 16, num: 20 })
  });

  test('part 1c', () => {
    const bin = convertToBinary('EE00D40C823060')
    expect(bin).toEqual('11101110000000001101010000001100100000100011000001100000');

    const packet = getPacket(bin);
    expect(packet.subPackets.length).toEqual(3)
    expect(packet.subPackets[0]).toEqual({ version: '010', typeID: 4, size: 11, num: 1 })
    expect(packet.subPackets[1]).toEqual({ version: '100', typeID: 4, size: 11, num: 2 })
    expect(packet.subPackets[2]).toEqual({ version: '001', typeID: 4, size: 11, num: 3 })
  });

  test('part 1d1', () => {
    const bin = convertToBinary('8A004A801A8002F478')
    const packet = getPacket(bin);
    expect(getVersionSum(packet)).toBe(16)
  });
  test('part 1d2', () => {
    const bin = convertToBinary('620080001611562C8802118E34')
    const packet = getPacket(bin);
    expect(getVersionSum(packet)).toBe(12)
  });
  test('part 1d3', () => {
    const bin = convertToBinary('C0015000016115A2E0802F182340')
    const packet = getPacket(bin, 0);
    expect(getVersionSum(packet)).toBe(23)
  });
  test('part 1d4', () => {
    const bin = convertToBinary('A0016C880162017C3686B18A3D4780')
    const packet = getPacket(bin);
    expect(getVersionSum(packet)).toBe(31)
  });

  test('part 1', () => {
    const bin = convertToBinary(input)
    const packet = getPacket(bin, 0);
    console.log(JSON.stringify(packet, null, 2))
    expect(getVersionSum(packet)).toBe(877)
  });
*/
  function calculatePacket(packet) {
    let result = 0;
    switch (packet.typeID) {
      case 0: result = packet.subPackets.reduce((acc, p) => acc + calculatePacket(p), 0); break;
      case 1: result = packet.subPackets.reduce((acc, p) => acc * calculatePacket(p), 1); break;
      case 2: result = Math.min(...packet.subPackets.map(p => calculatePacket(p))); break;
      case 3: result = Math.max(...packet.subPackets.map(p => calculatePacket(p))); break;
      case 4: result = packet.num; break;
      case 5: result = calculatePacket(packet.subPackets[0]) > calculatePacket(packet.subPackets[1]) ? 1 : 0; break;
      case 6: result = calculatePacket(packet.subPackets[0]) < calculatePacket(packet.subPackets[1]) ? 1 : 0; break;
      case 7: result = calculatePacket(packet.subPackets[0]) === calculatePacket(packet.subPackets[1]) ? 1 : 0; break;
    }
    // console.log('calculate', packet, ' -> ', result)
    return result;
  }
  test('part 2a', () => {
    expect(calculatePacket(getPacket(convertToBinary('C200B40A82')))).toEqual(3);// finds the sum of 1 and 2, resulting in the value 3.
    expect(calculatePacket(getPacket(convertToBinary('04005AC33890')))).toEqual(54);// finds the product of 6 and 9, resulting in the value 54.
    expect(calculatePacket(getPacket(convertToBinary('880086C3E88112')))).toEqual(7);// finds the minimum of 7, 8, and 9, resulting in the value 7.
    expect(calculatePacket(getPacket(convertToBinary('CE00C43D881120')))).toEqual(9);// finds the maximum of 7, 8, and 9, resulting in the value 9.
    expect(calculatePacket(getPacket(convertToBinary('D8005AC2A8F0')))).toEqual(1);// produces 1, because 5 is less than 15.
    expect(calculatePacket(getPacket(convertToBinary('F600BC2D8F')))).toEqual(0);// produces 0, because 5 is not greater than 15.
    expect(calculatePacket(getPacket(convertToBinary('9C005AC2F8F0')))).toEqual(0);// produces 0, because 5 is not equal to 15.
    expect(calculatePacket(getPacket(convertToBinary('9C0141080250320F1802104A08')))).toEqual(1);// produces 1, because 1 + 3 = 2 * 2
  });
  test('part 2a', () => {
    expect(calculatePacket(getPacket(convertToBinary(input)))).toEqual(194435634456);// finds the sum of 1 and 2, resulting in the value 3.
  });
  /*
    */
});

const input = `60552F100693298A9EF0039D24B129BA56D67282E600A4B5857002439CE580E5E5AEF67803600D2E294B2FCE8AC489BAEF37FEACB31A678548034EA0086253B183F4F6BDDE864B13CBCFBC4C10066508E3F4B4B9965300470026E92DC2960691F7F3AB32CBE834C01A9B7A933E9D241003A520DF316647002E57C1331DFCE16A249802DA009CAD2117993CD2A253B33C8BA00277180390F60E45D30062354598AA4008641A8710FCC01492FB75004850EE5210ACEF68DE2A327B12500327D848028ED0046661A209986896041802DA0098002131621842300043E3C4168B12BCB6835C00B6033F480C493003C40080029F1400B70039808AC30024C009500208064C601674804E870025003AA400BED8024900066272D7A7F56A8FB0044B272B7C0E6F2392E3460094FAA5002512957B98717004A4779DAECC7E9188AB008B93B7B86CB5E47B2B48D7CAD3328FB76B40465243C8018F49CA561C979C182723D769642200412756271FC80460A00CC0401D8211A2270803D10A1645B947B3004A4BA55801494BC330A5BB6E28CCE60BE6012CB2A4A854A13CD34880572523898C7EDE1A9FA7EED53F1F38CD418080461B00440010A845152360803F0FA38C7798413005E4FB102D004E6492649CC017F004A448A44826AB9BFAB5E0AA8053306B0CE4D324BB2149ADDA2904028600021909E0AC7F0004221FC36826200FC3C8EB10940109DED1960CCE9A1008C731CB4FD0B8BD004872BC8C3A432BC8C3A4240231CF1C78028200F41485F100001098EB1F234900505224328612AF33A97367EA00CC4585F315073004E4C2B003530004363847889E200C45985F140C010A005565FD3F06C249F9E3BC8280804B234CA3C962E1F1C64ADED77D10C3002669A0C0109FB47D9EC58BC01391873141197DCBCEA401E2CE80D0052331E95F373798F4AF9B998802D3B64C9AB6617080`;
