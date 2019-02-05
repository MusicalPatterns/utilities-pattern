import { Scale } from '@musical-patterns/compiler'
import {
    apply,
    DictionaryOf,
    from,
    OCTAVE,
    offsetFromOneIndexedToZeroIndexed,
    positiveIntegers,
    Power,
    reciprocal,
    Scalar,
    to,
} from '@musical-patterns/utilities'

const buildStandardScales: () => DictionaryOf<Scale> =
    (): DictionaryOf<Scale> => {
        const subharmonicSeriesScale: Scale = {
            scalars: positiveIntegers.map((integer: number): Scalar => to.Scalar(reciprocal(integer))),
        }

        const harmonicSeriesScale: Scale = {
            scalars: positiveIntegers.map((integer: number): Scalar => to.Scalar(integer)),
        }

        const flatDurationsScale: Scale = harmonicSeriesScale

        const octaveSeriesScale: Scale = {
            scalars: positiveIntegers
                .map(to.Power)
                .map((power: Power): Scalar =>
                    to.Scalar(from.Base(apply.Power(
                        OCTAVE,
                        to.Power(from.Index(offsetFromOneIndexedToZeroIndexed(to.Index(from.Power(power))))),
                    ))),
                ),
        }

        const nonScale: Scale = {}

        return {
            flatDurationsScale,
            harmonicSeriesScale,
            nonScale,
            octaveSeriesScale,
            subharmonicSeriesScale,
        }
    }

export {
    buildStandardScales,
}
