import {
    DictionaryOf,
    DomValueOrChecked,
    Hz,
    KeyMap,
    Maybe,
    Meters,
    Ms,
    NominalNumber,
    Scalar,
    Translation,
} from '@musical-patterns/utilities'
import { Presentable } from '../types'
import { Attributes } from './attributes'

type SingularSpecValue = DomValueOrChecked | NominalNumber
type ArrayedSpecValue = SingularSpecValue[]
type SpecValue = SingularSpecValue | ArrayedSpecValue

type SingularDomSpecValue = DomValueOrChecked
type ArrayedDomSpecValue = SingularDomSpecValue[]
type DomSpecValue = SingularDomSpecValue | ArrayedDomSpecValue

enum StandardProperties {
    DURATION_TRANSLATION = 'baseDurationTranslation',
    BASE_DURATION = 'baseDuration',
    FREQUENCY_TRANSLATION = 'baseFrequencyTranslation',
    BASE_FREQUENCY = 'baseFrequency',
    BASE_POSITION = 'basePosition',
    BASE_POSITION_SCALAR = 'basePositionScalar',
}

type StandardSpec = Partial<{
    [ StandardProperties.DURATION_TRANSLATION ]: Translation<Ms>,
    [ StandardProperties.BASE_DURATION ]: Scalar<Ms>,
    [ StandardProperties.FREQUENCY_TRANSLATION ]: Translation<Hz>,
    [ StandardProperties.BASE_FREQUENCY ]: Scalar<Hz>,
    [ StandardProperties.BASE_POSITION ]: Array<Translation<Meters>>,
    [ StandardProperties.BASE_POSITION_SCALAR ]: Scalar<Meters>,
}>

interface Spec extends StandardSpec {
    [ index: string ]: Maybe<SpecValue>,
}

interface DomSpec extends KeyMap<StandardSpec, DomSpecValue> {
    [ index: string ]: Maybe<DomSpecValue>
}

type SingularValidationResult = Maybe<string>

type ArrayedValidationResult = Maybe<SingularValidationResult[]>

type ValidationResult = SingularValidationResult | ArrayedValidationResult

type ValidationResults<SpecType = Spec> = Maybe<Partial<KeyMap<SpecType, ValidationResult>>>

type ValidationFunction<SpecType = Spec> = (spec: SpecType) => ValidationResults<SpecType>

interface Preset<SpecType = Spec> extends Partial<Presentable> {
    spec: SpecType,
}

interface Data<SpecType = Spec> {
    attributes: Attributes<SpecType>,
    initial: SpecType,
    presets?: DictionaryOf<Preset<SpecType>>,
    validationFunction?: ValidationFunction<SpecType>,
}

type StandardData = Data<StandardSpec>

export {
    Preset,
    StandardSpec,
    StandardProperties,
    Spec,
    StandardData,
    Data,
    ValidationFunction,
    ValidationResults,
    SingularValidationResult,
    ArrayedValidationResult,
    ValidationResult,
    SpecValue,
    SingularSpecValue,
    ArrayedSpecValue,
    DomSpec,
    SingularDomSpecValue,
    ArrayedDomSpecValue,
    DomSpecValue,
}
