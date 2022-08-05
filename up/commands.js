const formatGeneratorResult = base => props => {
  const output = base(props)
  return ['hidable', output[0], `${Math.round(log2(output[1], 16)*100)/100} bits`, `that's out of ${output[1].toLocaleString()} posible passwords`]
}
const formatStatusResult = (base, type='plain') => props => {
  const output = base(props)
  return [output[0] ? 'error' : type, output[1]]
}
input.commands = {children:{
  generate:{
    help:'generate random meaningful passwords from a number of noun groups and connecting words',
    base:formatGeneratorResult(generator.phrase.combined),
    exclusions:[[['groupCount', 'groupSize', 'firstGroupSize'], 'strength']],
    prioritizedParam:['strength'],
    defaultParam:{groupCount:2, groupSize:2, firstGroupSize:null},
    param:{
      groupCount:{
        positional:true,
        type:paramType.intFrom(1),
        help:'set the number of noun groups',
      },
      groupSize:{
        positional:true,
        type:paramType.intBetween(1, 5),
        help:'set the size of each noun group',
      },
      firstGroupSize:{
        positional:true,
        suggestion:5,
        type:paramType.intBetween(1, 5),
        help:'set the size of the first noun group, to further control the size of the password',
      },
    },
    children:{
      strength:{
        base:formatGeneratorResult(generator.minEntropy),
        help:'set the password strength in number of bits',
        param:{
          bitCount:{
            type:paramType.intFrom(1),
            positional:true,
            required:true,
            suggestion:64,
            help:'the password strength',
          }
        },
      },
      nounChain:{
        base:formatGeneratorResult(generator.nounGroup.randChain),
        help:'generate a chain of noun groups with a target number of bits of entropy',
        defaultParam:{groupSize:2},
        param:{
          bitCount:{
            type:paramType.intFrom(1),
            positional:true,
            required:true,
            suggestion:64,
            help:'the target number of bits',
          },
          groupSize:{
            type:paramType.intFrom(1),
            help:'maximum group size for the noun groups',
          },
        },
      },
    },
  },
  theme:{
    base:formatStatusResult(setTheme),
    help:'set the theme of the page',
    defaultParam:{color:null, background:null},
    param:{
      color:{
        positional:true,
        type:paramType.choices('a color', colorList, name => ({text:name, color:name})),
        help:'the color scheme for the theme',
      },
      background:{
        type:paramType.choices('a theme background', ['white', 'dark', 'darker', 'black'], name => ({text:name})),
        help:'select the dark or light theme background',
      },
    },
  },
  encode:{
    base:formatStatusResult(generator.encode, 'hidable'),
    help:'encode texts to the understandable format',
    param:{
      input:{
        positional:true,
        hidable:true,
        type:paramType.string,
        help:'the text to encode',
      },
    },
  },
  decode:{
    base:formatStatusResult(generator.decode, 'hidable'),
    help:'decode texts from the understandable format',
    param:{
      input:{
        positional:true,
        hidable:true,
        type:paramType.string,
        help:'the text to decode',
      },
    },
  },
}}
onCommandDefined(input.commands)
